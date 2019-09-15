const mongoose = require('mongoose')
const schema = mongoose.Schema

const articleSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, 'userId required']
    },
    title: {
        type: String,
        required: [true, 'Title Required']
    },
    content: {
        type: String,
        required: [true, 'Content Required']
    },
    url: {
        type: String,
        required: [true, 'Url Required']
    },


}, {
    timestamps: true
})

const articleModel = mongoose.model('Article', articleSchema)

module.exports = articleModel