require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const cors = require('cors')
let routeIndex = require('./routes/index');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use('/', routeIndex);

mongoose.connect('mongodb://localhost:27017/mini-wpDB',{useNewUrlParser:true}).then(()=>{
    console.log("connection OK")
}).catch((err)=>{
    console.log(err)
});

app.listen(port, function(){
    console.log(`app listening on port ${port}`)
})