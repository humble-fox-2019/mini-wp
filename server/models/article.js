const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  featured_image: {
    type: String,
    // required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
