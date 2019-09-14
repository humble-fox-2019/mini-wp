if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
    require('dotenv').config();
}
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/index')
const mongoose = require('mongoose');
const morgan = require('morgan')
const errorHandler = require('./helpers/errohandler')
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/', routes)
mongoose.connect(process.env.LINK, {useNewUrlParser: true})
.then(data => {
    console.log('success')
}).catch(err => {
    console.log('error')
})

app.use(errorHandler) 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))