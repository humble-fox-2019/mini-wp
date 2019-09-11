if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const axios = require('axios')
const cors = require('cors')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

console.log(process.env.BASE_URL)

mongoose.connect(process.env.BASE_URL, { useNewUrlParser : true, useUnifiedTopology: true })
    .then(success => {
        console.log('mongoose connected success')
    })
    .catch(err => {
        console.log(err)
        console.log('mongoose connected fail')
    })

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

// app.use('/', indexRouter)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})