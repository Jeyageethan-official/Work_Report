const express = require("express");
const passport = require("../config/passport");
const authController = require("../controllers/auth.controller");
const env = require("../config/env");
const {
  registerValidator,
  loginValidator,
  forgotValidator,
  resetValidator,
  verifyPostValidator,
  verifyQueryValidator,
  resendVerifyValidator
} = require("../validators/auth.validators");
const { authLimiter, loginLimiter } = require("../middleware/rate-limit.middleware");

const router = express.Router();

router.post("/register", authLimiter, registerValidator, authController.register);
router.post("/login", loginLimiter, loginValidator, authController.login);
router.post("/refresh", authLimiter, authController.refresh);
router.post("/logout", authLimiter, authController.logout);

router.post("/forgot-password", authLimiter, forgotValidator, authController.forgotPassword);
router.post("/reset-password", authLimiter, resetValidator, authController.resetPassword);
router.post("/verify-email", authLimiter, verifyPostValidator, authController.verifyEmail);
router.get("/verify-email", authLimiter, verifyQueryValidator, authController.verifyEmailFromLink);
router.post("/resend-verification", authLimiter, resendVerifyValidator, authController.resendVerification);

router.get("/google", authLimiter, (req, res, next) => {
  const requestedOrigin = String(req.query.origin || "").trim();
  const safeOrigin = env.frontendOrigins.includes(requestedOrigin)
    ? requestedOrigin
    : (env.frontendOrigins[0] || env.appBaseUrl);
  const state = Buffer.from(JSON.stringify({ origin: safeOrigin }), "utf8").toString("base64url");

  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    state,
    session: false
  })(req, res, next);
});

router.get(
  "/google/callback",
  authLimiter,
  passport.authenticate("google", { failureRedirect: "/api/auth/google/failure", session: false }),
  authController.googleCallbackSuccess
);

router.get("/google/failure", authController.googleCallbackFailure);
router.get("/me", authController.me);
router.get("/firebase-token", authController.firebaseBridgeToken);

module.exports = router;
