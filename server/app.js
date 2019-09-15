if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes')
const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect('mongodb+srv://admin:admin@willheryanto-8zo7d.gcp.mongodb.net/mini-wp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(_ => {
    console.log('Database: connected')
  })
  .catch(_ => {
    console.log('Database: failed to connect')
  })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => console.log(`listening on ${PORT}`))