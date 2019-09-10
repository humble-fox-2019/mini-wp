const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title:{
        type: String,
        required:[true,'Title must not empty']
    },
    content:{
        type:String,
        required:[true, 'Content must not empty']
    },
    created:{
        type:Date,
    }
})
const Article = mongoose.model('Article',articleSchema)
module.exports = Article