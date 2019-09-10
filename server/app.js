require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/miniwp', {
    useNewUrlParser: true
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

const articleUser = require('./routes/article')

app.use('/article', articleUser)

const errHandler = require('./middleware/errHandler')
// app.use('./middleware/errHandler.js')
app.listen(port, () => {
    console.log(`Live and Listening to Port ${port}`)
})