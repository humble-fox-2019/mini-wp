const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    featured_image: {
        type: String,
        required: true
    },
    slug : {
        type: String
    }
}, {
    timestamps: true
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;