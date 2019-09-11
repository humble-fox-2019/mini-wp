const express = require('express')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes/index')

if(process.env.NODE_ENV === 'dev') require('dotenv').config()
const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cors())

// routes
app.use('/', routes)

app.use(errorHandler)
app.listen(port, () => {
    console.log('listening on', port)
})