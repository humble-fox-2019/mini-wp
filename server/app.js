if (process.env.NODE_ENV === 'development') {
    console.log(process.env.NODE_ENV)
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(`${MONGODB_URI}`, { useNewUrlParser: true })
    .then(ok => {
        console.log('mongodb connected!')
    })
    .catch(err => {
        console.log('cannot connect to mongodb!');
        console.log(err);
    })

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use('/', routes);
app.use(errorHandler);

app.listen(PORT, () => console.log('app listening on port', PORT));