if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
    require('dotenv').config();
}
const errorHandler = require('./middlewares/errorHandler');
const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes/index');
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/",routes);
//let connect = 'mongodb://localhost:27017/miniWP'
mongoose.connect(process.env.ATLAS_CONNECT,{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify:false})
.then(data => {
    console.log('success connect')
}).catch(err => {
    console.log('error')
})
app.use(errorHandler);
app.listen(port,()=>{
    console.log("Server listen to "+port);
});

