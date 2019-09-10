const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/mini-wp-igun', { useNewUrlParser: true })
    .then(ok => {
        console.log('mongodb connected!')
    })
    .catch(err => {
        console.log('cannot connect to mongodb!', err);
    })

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use('/', routes);
app.use(errorHandler);

app.listen(PORT, () => console.log('app listening on port', PORT));