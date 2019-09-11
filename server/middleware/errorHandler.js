function errorHandler ( err , req, res , next ) {
    console.log("Server Error")
    
    console.log( JSON.stringify( err , null , 2)  , "<<<<<<<<" );

    let status ;
    let message;
    
    if ( err.name == 'ValidationError' ) {
        status = 400;
        message = "Validation Error";
    } else if ( err.name == 'MongoError' ) {
        status = 401;
        message = 'User already registered';
    } else {
        status = err.status || 500;
        message = err.message || 'Internal Server Error';
    }

    

    res.status( status ).json({ status , message })
}

module.exports = errorHandler;