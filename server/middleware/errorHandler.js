function errorHandler ( err , req, res , next ) {
    console.log("Server Error")
    
    console.log( JSON.stringify( err , null , 2)  , "<<<<<<<<" );

    let status = err.status || 500;
    let message = err.message || 'Internal Server Error';
    if ( err.name == 'ValidationError' ) {
        status = 400;
    }


    res.status( status ).json({ status , message })
}

module.exports = errorHandler;