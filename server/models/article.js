const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, `Title can not be empty`]
    },
    content: {
        type: String,
        required: [true, `Password cannot be empty`]
    },
    img: {
        type: String,
        required: [true, `Image cannot be empty`]
    },
    tag: [],
    UserId: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
}, {
        timestamps: true,
        versionKey: false
    });

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;