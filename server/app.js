require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const mongoose = require('mongoose')
const index = require('./routes/index')
const errHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/', index)

let temp = 'mongodb+srv://ayusudi:ayusudi@cluster0-acddn.mongodb.net/mini-wp?retryWrites=true&w=majority'

mongoose.connect(temp, {
  useNewUrlParser : true
}, function(err){
  if(err) console.log(`server isn't connect to mongodb`);
  else console.log('Connected!');
})

app.use(errHandler)

app.listen(PORT, function(){
  console.log(`Hello from port ${PORT}`);
})