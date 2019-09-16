const { verify } = require('../helpers/jwt')
const User = require('../models/User')

function userAuthentication(req, res, next) {
  try{
    const decode = verify(req.headers.token)
    req.decode = decode
    
    return User.findOne({ email: decode.email })
      .then(user => {
        if(user) {
          next()
        }else{
          next({
            status: 404,
            message: 'Your account not authenticated'
          })
        }
      })
      .catch(next)
  }catch(err){
    next(err)
  }
}

module.exports = userAuthentication

