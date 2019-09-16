const bcrypt = require('bcryptjs');

module.exports = {
    HashingPassword : (password)=>{
        console.log(password , ' di helpers')
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash
    },
    ComparePassword : (passwordDiDb , passwordInput)=>{
        console.log(passwordDiDb , passwordInput , ' ini di helpers =<><><><><>')
        return bcrypt.compareSync( passwordInput , passwordDiDb); 
    },
}