const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    isPublished: {
        type: Boolean
    },
    image: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article