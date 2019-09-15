'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ObjectID = mongoose.Schema.Types.ObjectId

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please insert a title for the article!']
  },
  content: { type: String, required: [true, 'Please insert the content of the post!'] },
  author: { type: ObjectID, ref: 'User' },
  featured_image: { type: String, default: null }

}, {
  timestamps: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
