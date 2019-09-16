const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title must be filled']
    },
    content: String,
    photo: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [String],
    published: Boolean
}, {
    timestamps: true,
    versionKey: false
})

const Article = mongoose.model('Article', articleSchema)
module.exports = Article