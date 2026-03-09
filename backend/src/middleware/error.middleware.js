const ApiError = require("../utils/ApiError");

function notFoundHandler(req, res, next) {
  next(new ApiError(404, "Route not found", "NOT_FOUND"));
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  if (statusCode >= 500) {
    console.error("[API_ERROR]", req.method, req.originalUrl, err.message);
  }
  const payload = {
    ok: false,
    code: err.code || "INTERNAL_ERROR",
    message: statusCode >= 500 ? "Internal server error" : err.message
  };

  if (process.env.NODE_ENV !== "production") {
    payload.debug = err.message;
  }

  res.status(statusCode).json(payload);
}

module.exports = {
  notFoundHandler,
  errorHandler
};
