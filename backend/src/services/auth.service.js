const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const env = require("../config/env");
const userModel = require("../models/user.model");
const tokenModel = require("../models/token.model");
const sessionModel = require("../models/session.model");
const { randomToken, sha256, addMinutes } = require("../utils/tokens");
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../utils/jwt");
const emailService = require("./email.service");

const VERIFY_TOKEN_MINUTES = 60 * 24;
const RESET_TOKEN_MINUTES = 20;

function buildAuthCookies(res, { accessToken, refreshToken, rememberMe = false }) {
  const accessMaxAge = 15 * 60 * 1000;
  const refreshMaxAge = rememberMe ? 60 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;

  const base = {
    httpOnly: true,
    secure: env.cookie.secure,
    sameSite: env.cookie.sameSite,
    domain: env.cookie.domain,
    path: "/"
  };

  res.cookie("wr_access_token", accessToken, { ...base, maxAge: accessMaxAge });
  res.cookie("wr_refresh_token", refreshToken, { ...base, maxAge: refreshMaxAge });
}

function clearAuthCookies(res) {
  const base = {
    httpOnly: true,
    secure: env.cookie.secure,
    sameSite: env.cookie.sameSite,
    domain: env.cookie.domain,
    path: "/"
  };
  res.clearCookie("wr_access_token", base);
  res.clearCookie("wr_refresh_token", base);
}

function toSafeUser(user) {
  return {
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    isEmailVerified: Boolean(user.is_email_verified),
    isDisabled: Boolean(user.is_disabled),
    role: user.role || "user",
    authProvider: user.auth_provider,
    firebaseUid: user.firebase_uid || null,
    avatarUrl: user.avatar_url,
    lastLoginAt: user.last_login_at || null,
    createdAt: user.created_at,
    updatedAt: user.updated_at
  };
}

async function createVerificationToken(userId) {
  const plain = randomToken(32);
  const hash = sha256(plain);
  await tokenModel.consumeTokensByType(userId, "EMAIL_VERIFY");
  await tokenModel.createToken({
    userId,
    tokenHash: hash,
    tokenType: "EMAIL_VERIFY",
    expiresAt: addMinutes(new Date(), VERIFY_TOKEN_MINUTES)
  });
  return plain;
}

async function createResetToken(userId) {
  const plain = randomToken(32);
  const hash = sha256(plain);
  await tokenModel.consumeTokensByType(userId, "PASSWORD_RESET");
  await tokenModel.createToken({
    userId,
    tokenHash: hash,
    tokenType: "PASSWORD_RESET",
    expiresAt: addMinutes(new Date(), RESET_TOKEN_MINUTES)
  });
  return plain;
}

async function issueSession(user, { rememberMe = false, userAgent = "", ipAddress = "" }) {
  const accessToken = signAccessToken({ sub: user.id, email: user.email });
  const refreshExpiresIn = rememberMe ? env.jwt.rememberRefreshExpiresIn : env.jwt.refreshExpiresIn;
  const refreshToken = signRefreshToken(
    { sub: user.id, email: user.email, typ: "refresh", rememberMe },
    refreshExpiresIn
  );
  const refreshTokenHash = sha256(refreshToken);
  const decoded = jwt.decode(refreshToken);

  await sessionModel.createSession({
    userId: user.id,
    refreshTokenHash,
    userAgent,
    ipAddress,
    expiresAt: new Date(decoded.exp * 1000),
    rememberMe
  });

  return { accessToken, refreshToken };
}

async function register({ fullName, email, password }) {
  const existing = await userModel.findByEmail(email);
  if (existing) {
    throw new ApiError(409, "Email already registered", "EMAIL_EXISTS");
  }

  const passwordHash = await bcrypt.hash(password, env.bcryptSaltRounds);
  const user = await userModel.createUser({
    fullName,
    email,
    passwordHash,
    provider: "local",
    isEmailVerified: false
  });

  const verifyToken = await createVerificationToken(user.id);
  const verifyLink = `${env.appBaseUrl}/verify.html?token=${encodeURIComponent(verifyToken)}`;
  await emailService.sendVerificationEmail({ to: user.email, fullName: user.full_name, verifyLink });

  return toSafeUser(user);
}

async function login({ email, password, rememberMe, userAgent, ipAddress }) {
  const user = await userModel.findByEmail(email);
  if (!user || !user.password_hash) {
    throw new ApiError(401, "Invalid email or password", "INVALID_CREDENTIALS");
  }

  const matched = await bcrypt.compare(password, user.password_hash);
  if (!matched) {
    throw new ApiError(401, "Invalid email or password", "INVALID_CREDENTIALS");
  }

  if (!user.is_email_verified) {
    throw new ApiError(403, "Email is not verified", "EMAIL_NOT_VERIFIED");
  }
  if (user.is_disabled) {
    throw new ApiError(403, "Account is disabled. Contact administrator.", "ACCOUNT_DISABLED");
  }

  const tokens = await issueSession(user, { rememberMe, userAgent, ipAddress });
  await userModel.updateLastLogin(user.id);
  return { user: toSafeUser(user), tokens };
}

async function refreshSession(refreshToken, { userAgent = "", ipAddress = "" }) {
  if (!refreshToken) {
    throw new ApiError(401, "Missing refresh token", "REFRESH_REQUIRED");
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw new ApiError(401, "Invalid refresh token", "INVALID_REFRESH");
  }

  const hash = sha256(refreshToken);
  const session = await sessionModel.findValidSession(hash);
  if (!session) {
    throw new ApiError(401, "Session expired. Please sign in again.", "SESSION_EXPIRED");
  }

  const user = await userModel.findById(decoded.sub);
  if (!user) {
    throw new ApiError(401, "User not found", "USER_NOT_FOUND");
  }
  if (user.is_disabled) {
    throw new ApiError(403, "Account is disabled. Contact administrator.", "ACCOUNT_DISABLED");
  }

  await sessionModel.revokeSessionByToken(hash);

  const rememberMe = Boolean(decoded.rememberMe || session.remember_me);
  const tokens = await issueSession(user, { rememberMe, userAgent, ipAddress });
  return { user: toSafeUser(user), tokens, rememberMe };
}

async function logout(refreshToken) {
  if (refreshToken) {
    await sessionModel.revokeSessionByToken(sha256(refreshToken));
  }
}

async function sendForgotPassword(email) {
  const user = await userModel.findByEmail(email);
  if (!user || !user.password_hash) {
    return;
  }
  const resetToken = await createResetToken(user.id);
  const resetLink = `${env.appBaseUrl}/reset.html?token=${encodeURIComponent(resetToken)}`;
  await emailService.sendResetPasswordEmail({ to: user.email, fullName: user.full_name, resetLink });
}

async function resetPassword({ token, password }) {
  const hashed = sha256(token);
  const tokenRow = await tokenModel.findValidToken({ tokenHash: hashed, tokenType: "PASSWORD_RESET" });
  if (!tokenRow) {
    throw new ApiError(400, "Invalid or expired reset token", "INVALID_RESET_TOKEN");
  }

  const passwordHash = await bcrypt.hash(password, env.bcryptSaltRounds);
  await userModel.updatePassword(tokenRow.user_id, passwordHash);
  await tokenModel.consumeToken(tokenRow.id);
  await sessionModel.revokeAllUserSessions(tokenRow.user_id);
}

async function verifyEmailToken(token) {
  const hashed = sha256(token);
  const tokenRow = await tokenModel.findValidToken({ tokenHash: hashed, tokenType: "EMAIL_VERIFY" });
  if (!tokenRow) {
    throw new ApiError(400, "Invalid or expired verification token", "INVALID_VERIFY_TOKEN");
  }

  await userModel.markEmailVerified(tokenRow.user_id);
  await tokenModel.consumeToken(tokenRow.id);
}

async function resendVerification(email) {
  const user = await userModel.findByEmail(email);
  if (!user || user.is_email_verified) {
    return;
  }
  const token = await createVerificationToken(user.id);
  const verifyLink = `${env.appBaseUrl}/verify.html?token=${encodeURIComponent(token)}`;
  await emailService.sendVerificationEmail({ to: user.email, fullName: user.full_name, verifyLink });
}

async function upsertGoogleUser(profile) {
  const googleId = profile.id;
  const email = profile.emails?.[0]?.value?.toLowerCase();
  const fullName = profile.displayName || email?.split("@")[0] || "Google User";
  const avatarUrl = profile.photos?.[0]?.value || null;

  if (!email) {
    throw new ApiError(400, "Google account email missing", "GOOGLE_EMAIL_MISSING");
  }

  const byGoogleId = await userModel.findByGoogleId(googleId);
  if (byGoogleId) {
    const updated = await userModel.updateFromGoogle(byGoogleId.id, { fullName, avatarUrl, googleId });
    if (updated.is_disabled) {
      throw new ApiError(403, "Account is disabled. Contact administrator.", "ACCOUNT_DISABLED");
    }
    return updated;
  }

  const existing = await userModel.findByEmail(email);
  if (existing) {
    const updated = await userModel.updateFromGoogle(existing.id, { fullName, avatarUrl, googleId });
    if (updated.is_disabled) {
      throw new ApiError(403, "Account is disabled. Contact administrator.", "ACCOUNT_DISABLED");
    }
    return updated;
  }

  return userModel.createUser({
    fullName,
    email,
    passwordHash: null,
    provider: "google",
    googleId,
    avatarUrl,
    isEmailVerified: true
  });
}

module.exports = {
  buildAuthCookies,
  clearAuthCookies,
  toSafeUser,
  register,
  login,
  refreshSession,
  logout,
  sendForgotPassword,
  resetPassword,
  verifyEmailToken,
  resendVerification,
  upsertGoogleUser,
  issueSession
};
