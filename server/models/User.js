const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {  HashingPassword } = require('../helpers/password')
const UserSchema = new Schema({
  username : {
      type : String,
      required : true,
      validate : {
        validator : function(){
            return new Promise((resolve,reject)=>{
                User.findOne({ username : this.username })
                .then(user=>{
                    if(user){
                        resolve(false)
                    }else {
                        resolve(true)
                    }
                })
            })
        },
        message : 'username must be unique'
      }
  },
  password : {
      type : String,
      required : true,
      minlength : [4,'Minimal karakter password 4']
  },
  email : {
      type : String,
      required : true,
      match :  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , 'email invalid'],
      validate : {
        validator : function(){
            return new Promise((resolve,reject)=>{
                User.findOne({ email : this.email })
                .then(user=>{
                    if(user){
                        resolve(false)
                    }else {
                        resolve(true)
                    }
                })
            })
        },
        message : 'email must be unique'
      }
  }
});


UserSchema.pre('save' , function(next,data){
    // this.
    this.password = HashingPassword(this.password)
    next()
})

const User = mongoose.model('User' , UserSchema)
module.exports = User