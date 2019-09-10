const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [12, 'Minimal 12 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  UserId: {
    type: String,
    ref: 'User'
  }
})

articleSchema.pre('updateOne', function (next) {
  const { content, title } = this.getUpdate()
  console.log(this.getUpdate(), '<<<<<<');
  if (content.length < 12 || title.length < 1) {
    next(`Validation Error. Please fill title and content. Content minimal length is 12`)
  }
  else {
   return next()
  }
}
)

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
