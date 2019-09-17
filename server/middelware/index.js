const jwt = require('jsonwebtoken');
const { TokenVerify} = require('../helpers/token')
const {   Article } = require('../models')
module.exports = {
    VerifyToken : (token)=>{
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            // console.log(decoded , ' di middelware')
            req.decoded = decoded
          } catch(err) {
            // err
          }
    },
    Authenthication : (req,res,next)=>{
        try {
          const decoded = TokenVerify(req.headers.token)
          let temp = {...decoded}
          if( typeof decoded.data == 'string'){
            decoded.data = {};
            decoded.data._id = temp.data;
          }
          req.decode = decoded;
          next()
        }catch (err){
          next({
            status : 401 ,
            message : "You don't have access"
          })
          // res.status(403).json({
          //   message : "anda tidak memilik akses"
          // })
        }
    },
    Authorized : (req,res,next)=>{
      Article.findOne({
        _id : req.params.id,
        author : req.decode.data._id
      })
      .then(user=>{
        if(user){
          next()
        }else {
          next({
            status : 401 ,
            message : "You don't have access"
          })
        }
      })
      .catch(err=>{
        next(err)
      })
    }
}

