const jwt = require("jsonwebtoken");
if (process.env.NODE_ENV === "dev") require("dotenv").config();

const secret = process.env.JWT_SECRET;

function generate(payload) {
  return jwt.sign(payload, secret);
}

function decode(token) {
  return jwt.verify(token, secret);
}

module.exports = {
  generate,
  decode
};