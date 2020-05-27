const jwt = require("../helpers/jwt");

function authentication(req, res, next) {
  try {
    const decode = jwt.decode(req.headers.token);
    req.decode = decode;
    next();
  } catch (err) {
    res.status(403).json({
      message: "wrong token"
    });
  }
}

module.exports = authentication;