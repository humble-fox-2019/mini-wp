const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    featured_image: {
        type: String
    },
    slug : {
        type: String
    }
}, {
    timestamps: true
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;