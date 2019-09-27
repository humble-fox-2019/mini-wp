const jwt = require('jsonwebtoken');
const SECRET_JWT = process.env.SECRET_JWT || 'SECRET';

function generateToken ( payload ) {
    return token = jwt.sign( payload , SECRET_JWT );
}

function decode ( token ) {
    return jwt.verify( token , SECRET_JWT );
}

module.exports = {
    generateToken,
    decode
}