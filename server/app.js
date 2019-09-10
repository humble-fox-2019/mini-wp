const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use('/', routes);

mongoose.connect('mongodb://localhost:27017/mini-wp', { useNewUrlParser: true })
    .then(ok => {
        console.log('mongodb connected!')
        return app.listen(PORT)
    })
    .then(ok => {
        console.log('app listening on port', PORT);
    })
    .catch(err => {
        console.log('cannot connect to mongodb!', err);
    })
