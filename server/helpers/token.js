const jwt = require('jsonwebtoken');
module.exports = {
    Token : (data)=>{
        console.log(process.env.SECRET , ' ==========')
        return jwt.sign({
            data 
        } , process.env.SECRET)
    },
    TokenVerify : (token)=>{
        return jwt.verify(token , process.env.SECRET)
    }
}