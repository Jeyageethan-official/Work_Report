const { body, query, validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

const emailBodyRule = body("email")
  .trim()
  .isEmail()
  .withMessage("Enter a valid email")
  .normalizeEmail();

const registerValidator = [
  body("fullName").trim().isLength({ min: 2, max: 120 }).withMessage("Full name is required"),
  emailBodyRule,
  body("password")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be at least 8 characters"),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
  validate
];

const loginValidator = [
  emailBodyRule,
  body("password").isLength({ min: 1 }).withMessage("Password is required"),
  body("rememberMe").optional().isBoolean(),
  validate
];

const forgotValidator = [emailBodyRule, validate];

const resetValidator = [
  body("token").isString().isLength({ min: 32, max: 256 }),
  body("password")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be at least 8 characters"),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
  validate
];

const verifyPostValidator = [body("token").isString().isLength({ min: 32, max: 256 }), validate];

const verifyQueryValidator = [query("token").isString().isLength({ min: 32, max: 256 }), validate];

const resendVerifyValidator = [emailBodyRule, validate];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(422, errors.array()[0].msg, "VALIDATION_ERROR"));
  }
  return next();
}

module.exports = {
  registerValidator,
  loginValidator,
  forgotValidator,
  resetValidator,
  verifyPostValidator,
  verifyQueryValidator,
  resendVerifyValidator
};
