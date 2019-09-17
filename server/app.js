if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const axios = require('axios')
const cors = require('cors')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const morgan = require('morgan')

mongoose.connect(process.env.BASE_URL, { useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex : true })
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
app.use(morgan('combined'))

app.get('/', (req, res) => {
    res.send(`Mantappp Connect CCCUUUUKKKKK`)
})
app.use('/', indexRouter)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})