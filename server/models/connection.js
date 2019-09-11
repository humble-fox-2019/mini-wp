const mongoose = require('mongoose');
if (process.env.NODE_ENV === 'dev') require('dotenv').config()

mongoose.connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose