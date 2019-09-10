const bcrypt = require('bcryptjs');
const SALT = bcrypt.genSaltSync( process.env.SALT_ROUNT );

function hash ( password) {
    return bcrypt.hashSync( password , SALT );
}
function compare ( password , hashedPassword ) {
    return bcrypt.compareSync( password , hashedPassword );
}

module.exports = {
    hash,
    compare
}