const crypto = require("crypto");

function randomToken(size = 32) {
  return crypto.randomBytes(size).toString("hex");
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

module.exports = {
  randomToken,
  sha256,
  addMinutes
};
