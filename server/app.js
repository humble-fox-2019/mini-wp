if ( process.env.NODE_ENV ) 
    require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/user');
const articleRouter = require('./routes/article');

const errorHandler = require('./middleware/errorHandler');

const app = express();
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect( DATABASE_URL , { useNewUrlParser : true })
    .then( () => { console.log( `Database connected to: ${DATABASE_URL}` ); })
    .catch( err =>{ console.log( err ); })

app.use( cors() )
app.use( express.json() ); 
app.use( express.urlencoded({ extended : true }));

app.use( '/' , userRouter );
app.use( '/articles' , articleRouter )

app.use( errorHandler )


const PORT = process.env.PORT || 3000;
app.listen( PORT , () => {
    console.log(`App Listening on PORT ${PORT}`);
})