const jwt = require("jsonwebtoken");
const env = require("../config/env");

function signAccessToken(payload) {
  return jwt.sign(payload, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpiresIn,
    issuer: "workreport-auth",
    audience: "workreport-app"
  });
}

function signRefreshToken(payload, expiresIn) {
  return jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn,
    issuer: "workreport-auth",
    audience: "workreport-app"
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, env.jwt.accessSecret, {
    issuer: "workreport-auth",
    audience: "workreport-app"
  });
}

function verifyRefreshToken(token) {
  return jwt.verify(token, env.jwt.refreshSecret, {
    issuer: "workreport-auth",
    audience: "workreport-app"
  });
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
