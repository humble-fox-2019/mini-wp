const mongoose = require('mongoose')
const schema = mongoose.Schema

const articleSchema = new schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const articleModel = mongoose.model('Article', articleSchema)

module.exports = articleModel