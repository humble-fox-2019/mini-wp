const mongoose = require('mongoose')
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title required']
  },
  content: {
    type: String,
    required: [true, 'Content required']
  },
  image: {
    type: String,
    required: [true, 'Image required']
  }
}, {
  timestamps: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
