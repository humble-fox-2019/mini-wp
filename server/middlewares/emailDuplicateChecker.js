const User = require ('../models/user')

function emailDuplicateChecker(req,res,next){
    User.findOne({email : req.body.email}).then((user)=>{
        if (!user){
            next()
        } else {
            next('email already registered')
        }
    })
}

module.exports = emailDuplicateChecker