// require('dotenv').config()
if(!process.env.NODE_ENV||process.env.NODE_ENV === 'development'){
  require('dotenv').config()
}
const express = require('express')
const app = express()
const PORT = process.env.PORT
const cors = require('cors')
const mongoose = require('mongoose')
const index = require('./routes/index')
const errHandler = require('./middlewares/errorHandler')
const database = process.env.MONGOO_ATLAS

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/', index)
// console.log(database);

mongoose.connect(database, {
  useNewUrlParser : true
}, function(err){
  if(err) console.log(`server isn't connect to mongodb`);
  else console.log('Connected!');
})

app.use(errHandler)

app.listen(PORT, function(){
  console.log(`Hello from port ${PORT}`);
})