
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: ['true', 'Title is required']
    },
    content: {
        type: String,
        required: ['true', 'Content is required']
    }
}, { timestamps: true })

module.exports = mongoose.model('Article', articleSchema)