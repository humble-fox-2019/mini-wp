
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
    tags: [{
        type: String
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    url: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Article', articleSchema)