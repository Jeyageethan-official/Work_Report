const { verifyAccessToken } = require("../utils/jwt");
const ApiError = require("../utils/ApiError");
const userModel = require("../models/user.model");

async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.wr_access_token;
    if (!token) {
      throw new ApiError(401, "Authentication required", "AUTH_REQUIRED");
    }

    const decoded = verifyAccessToken(token);
    const user = await userModel.findById(decoded.sub);
    if (!user) {
      throw new ApiError(401, "User not found", "AUTH_REQUIRED");
    }

    req.user = {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      isEmailVerified: Boolean(user.is_email_verified),
      isDisabled: Boolean(user.is_disabled),
      role: user.role || "user",
      authProvider: user.auth_provider,
      firebaseUid: user.firebase_uid || null,
      avatarUrl: user.avatar_url
    };

    if (req.user.isDisabled) {
      throw new ApiError(403, "Account is disabled. Contact administrator.", "ACCOUNT_DISABLED");
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  requireAuth
};
