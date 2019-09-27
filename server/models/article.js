const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    featured_image: {
        type: String,
    },
    author: {
        type: String
    },
    UserId: {
         type: Schema.Types.ObjectId, ref: 'users' 
    },
    tags: []
}, {
    timestamps: true,
    versionKey: false
})

const articles = mongoose.model('articles', articleSchema)

module.exports = articles;