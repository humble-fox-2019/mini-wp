const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/miniwp-development'



mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {
    console.log('Database connected')
  },
  err => {
    console.log('Failed to connect database')
  }
)
