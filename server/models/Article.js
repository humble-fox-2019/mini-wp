const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtitcleSchema = new Schema({
  title : {
      type : String,
      required : true,
      minlength : [5,"Minimal title required 5"]
  },
  content : {
      type : String,
      required : true,
      minlength : [10 , "Minimal Content required 10"]
  }, 
  featured_image : {
    type : String,
    required : true
  },
  author : {
    type :  Schema.Types.ObjectId , ref : 'User'
  },
  tagList : [{
    type :  Schema.Types.ObjectId , ref : 'Tag'
  }]
},{timestamps : {createdAt : 'created_at'}});


const Artitcle = mongoose.model('Artitcle' , ArtitcleSchema)
module.exports = Artitcle