const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    code: "RATE_LIMITED",
    message: "Too many requests. Please try again shortly."
  }
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    code: "TOO_MANY_LOGIN_ATTEMPTS",
    message: "Too many login attempts. Please try again in 15 minutes."
  }
});

module.exports = {
  authLimiter,
  loginLimiter
};
