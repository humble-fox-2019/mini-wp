if (process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT;
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
let routeIndex = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/mini-wpDB',{useNewUrlParser:true, useUnifiedTopology: true}).then(()=>{
    console.log("connection OK")
}).catch((err)=>{
    console.log(err)
});

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use('/', routeIndex);

app.use(errorHandler)

app.listen(port, function(){
    console.log(`app listening on port ${port}`)
})