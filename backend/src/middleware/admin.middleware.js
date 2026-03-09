const ApiError = require('../utils/ApiError');
const env = require('../config/env');

function requireAdminKey(req, res, next) {
  if (!env.adminApiKey) {
    return next(new ApiError(503, 'Admin API key not configured', 'ADMIN_KEY_NOT_CONFIGURED'));
  }

  const incoming = req.get('x-admin-key') || '';
  if (incoming !== env.adminApiKey) {
    return next(new ApiError(403, 'Forbidden', 'FORBIDDEN'));
  }

  return next();
}

function requireOwner(req, res, next) {
  if (!req.user) {
    return next(new ApiError(401, "Authentication required", "AUTH_REQUIRED"));
  }

  const isOwnerRole = (req.user.role || "").toLowerCase() === "owner";
  const isOwnerEmail = env.adminOwnerEmails.includes((req.user.email || "").toLowerCase());

  if (!isOwnerRole && !isOwnerEmail) {
    return next(new ApiError(403, "Owner access required", "OWNER_REQUIRED"));
  }

  return next();
}

module.exports = {
  requireAdminKey,
  requireOwner
};
