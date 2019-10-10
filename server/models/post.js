const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

let postSchema = new Schema({
    title: {
        type : String,
        required : [true, 'title is required']
    },
    description: {
        type : String,
        required : [true, 'your post must have some content!']
    },
    createdAt: Date,
    imageUrl: String,
    author: {
        type: ObjectId,
        ref: "User",
        required: true
    }

})

let Post = mongoose.model('Post', postSchema);

module.exports = Post