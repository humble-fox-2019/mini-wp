const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema({
    title: {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    createdAt: Date
})

let Post = mongoose.model('Post', postSchema);

module.exports = Post