if(!process.env.NODE_ENV || process.env.NODE_ENV == 'development'){
    require('dotenv').config()
}

const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 
const routes = require('./routes');
const errorHandling = require('./middelware/errorHandling')


app.use(express.json())
mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00-houoa.mongodb.net:27017,cluster0-shard-00-01-houoa.mongodb.net:27017,cluster0-shard-00-02-houoa.mongodb.net:27017/${process.env.MONGO_DATABASE}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`, {useNewUrlParser: true},()=>{
})
.then(data=>{
    console.log('mongodb is connected');
})
.catch(err=>{
    console.log(err)
})

app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))

app.use(cors()) 
app.get('/',(req,res,next)=>{
    res.send('HOME OF API')
})

app.use('/' , routes)

app.use(errorHandling)

app.listen(port,()=>{
    console.log('listening to port ',port);
})
