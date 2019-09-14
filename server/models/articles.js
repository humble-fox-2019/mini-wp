const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title must be filled"],
    },
    content: {
        type: String,
    },
    publish: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tag: [String],
    categorize: [String]  
},{ timestamps: true })


const Article = mongoose.model('Article', articleSchema)

module.exports = Article