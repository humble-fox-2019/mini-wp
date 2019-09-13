
if(process.env.NODE_ENV === 'development') require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const ATLAS_CONNECT = process.env.ATLAS_CONNECT

const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(ATLAS_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
        console.log(`connection success`)
    })
    .catch(err => {
        console.log(err)
        console.log(`connection failed`)
    })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`)
})