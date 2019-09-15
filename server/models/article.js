const slug = require('mongoose-slug-generator')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.plugin(slug)

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
  },
  featured_image: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    slug: 'title'
  },
  status: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: { createdAt: 'createdAt' } })

module.exports = mongoose.model('Article', articleSchema)