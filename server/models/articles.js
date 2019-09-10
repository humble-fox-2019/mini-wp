const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title must be filled"],
    },
    content: {
        type: String,
        required: [true, "Content must be filled"],
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tagId: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    categorizeId: [{
        type: Schema.Types.ObjectId,
        ref: 'Categorize'
    }]  
},{ timestamps: true })


const Article = mongoose.model('Article', articleSchema)

module.exports = Article