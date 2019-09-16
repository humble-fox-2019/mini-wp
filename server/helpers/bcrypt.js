const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

function hash(string) {
  return bcrypt.hashSync(string, salt);
}

function compare(string, hash) {
  return bcrypt.compareSync(string, hash);
}

module.exports = {
  hash,
  compare
};