'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ObjectID = mongoose.Schema.Types.ObjectId

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please insert a title for the article!']
  },
  description: String,
  content: String,
  author: { type: ObjectID, ref: 'User' },
  image: { type: String, default: '' },
  tags: [String]

}, {
  timestamps: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
