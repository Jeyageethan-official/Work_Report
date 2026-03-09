const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const authService = require("../services/auth.service");
const userModel = require("../models/user.model");
const env = require("../config/env");
const { verifyAccessToken } = require("../utils/jwt");

function resolvePopupOrigin(stateValue) {
  if (!stateValue) return env.frontendOrigins?.[0] || env.appBaseUrl;
  try {
    const parsed = JSON.parse(Buffer.from(String(stateValue), "base64url").toString("utf8"));
    const candidate = String(parsed?.origin || "").trim();
    if (env.frontendOrigins.includes(candidate)) {
      return candidate;
    }
  } catch {
    // ignore malformed state
  }
  return env.frontendOrigins?.[0] || env.appBaseUrl;
}

const register = asyncHandler(async (req, res) => {
  const user = await authService.register({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password
  });

  res.status(201).json({
    ok: true,
    message: "Registration successful. Please verify your email.",
    user
  });
});

const login = asyncHandler(async (req, res) => {
  const { user, tokens } = await authService.login({
    email: req.body.email,
    password: req.body.password,
    rememberMe: Boolean(req.body.rememberMe),
    userAgent: req.headers["user-agent"] || "",
    ipAddress: req.ip
  });

  authService.buildAuthCookies(res, {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    rememberMe: Boolean(req.body.rememberMe)
  });

  res.json({ ok: true, message: "Logged in successfully", user });
});

const me = asyncHandler(async (req, res) => {
  const token = req.cookies?.wr_access_token;
  if (!token) throw new ApiError(401, "Authentication required", "AUTH_REQUIRED");
  const decoded = verifyAccessToken(token);
  const dbUser = await userModel.findById(decoded.sub);
  if (!dbUser) {
    throw new ApiError(401, "Authentication required", "AUTH_REQUIRED");
  }
  if (dbUser.is_disabled) {
    throw new ApiError(403, "Account is disabled. Contact administrator.", "ACCOUNT_DISABLED");
  }
  res.json({ ok: true, user: authService.toSafeUser(dbUser) });
});

const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.wr_refresh_token;
  const { user, tokens, rememberMe } = await authService.refreshSession(refreshToken, {
    userAgent: req.headers["user-agent"] || "",
    ipAddress: req.ip
  });

  authService.buildAuthCookies(res, {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    rememberMe
  });

  res.json({ ok: true, user });
});

const firebaseBridgeToken = asyncHandler(async (req, res) => {
  res.status(410).json({
    ok: false,
    code: "FIREBASE_BRIDGE_REMOVED",
    message: "Firebase bridge token endpoint is disabled in MySQL-only mode."
  });
});

const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.cookies?.wr_refresh_token);
  authService.clearAuthCookies(res);
  res.json({ ok: true, message: "Logged out" });
});

const forgotPassword = asyncHandler(async (req, res) => {
  await authService.sendForgotPassword(req.body.email);
  res.json({ ok: true, message: "If this email exists, a reset link has been sent." });
});

const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword({ token: req.body.token, password: req.body.password });
  res.json({ ok: true, message: "Password reset successful" });
});

const verifyEmail = asyncHandler(async (req, res) => {
  await authService.verifyEmailToken(req.body.token);
  res.json({ ok: true, message: "Email verified successfully" });
});

const verifyEmailFromLink = asyncHandler(async (req, res) => {
  try {
    await authService.verifyEmailToken(req.query.token);
    return res.redirect(`${env.appBaseUrl}/verify.html?status=success`);
  } catch {
    return res.redirect(`${env.appBaseUrl}/verify.html?status=failed`);
  }
});

const resendVerification = asyncHandler(async (req, res) => {
  await authService.resendVerification(req.body.email);
  res.json({ ok: true, message: "If eligible, verification email has been sent." });
});

const googleCallbackSuccess = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Google sign-in failed", "GOOGLE_AUTH_FAILED");
  }

  const tokens = await authService.issueSession(req.user, {
    rememberMe: true,
    userAgent: req.headers["user-agent"] || "",
    ipAddress: req.ip
  });

  authService.buildAuthCookies(res, {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    rememberMe: true
  });
  await userModel.updateLastLogin(req.user.id);
  const userPayload = JSON.stringify(authService.toSafeUser(req.user));
  const frontendOrigin = resolvePopupOrigin(req.query?.state);
  // Relax headers only for OAuth popup bridge so postMessage can run in popup.
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
  );
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!doctype html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:24px;">
<script>
  (function () {
    const payload = { type: 'WR_GOOGLE_AUTH_SUCCESS', user: ${userPayload} };
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage(payload, ${JSON.stringify(frontendOrigin)});
      window.close();
      return;
    }
    document.body.innerHTML = '<h3>Google sign-in completed</h3><p>You can close this window and continue in the main app.</p>';
  })();
</script>
</body></html>`);
});

const googleCallbackFailure = asyncHandler(async (req, res) => {
  const frontendOrigin = resolvePopupOrigin(req.query?.state);
  // Relax headers only for OAuth popup bridge so postMessage can run in popup.
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
  );
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!doctype html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:24px;">
<script>
  (function () {
    const payload = { type: 'WR_GOOGLE_AUTH_ERROR', message: 'Google authentication failed.' };
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage(payload, ${JSON.stringify(frontendOrigin)});
      window.close();
      return;
    }
    document.body.innerHTML = '<h3>Google sign-in failed</h3><p>Please close this popup and retry from the app.</p>';
  })();
</script>
</body></html>`);
});

module.exports = {
  register,
  login,
  logout,
  me,
  refresh,
  forgotPassword,
  resetPassword,
  verifyEmail,
  verifyEmailFromLink,
  resendVerification,
  firebaseBridgeToken,
  googleCallbackSuccess,
  googleCallbackFailure
};
