module.exports = (err, req, res, next)=>{
    console.log(err.message , ' ><><><><><><>')
    let status = err.status || err.code || 500
    let message = err.message || 'internal server error'
    if(err.name == 'ValidationError'){
        res.status(400).json({
            message : err.message,
            data : err.message
        })
    }else {
        res.status(status).send({message})
    }
}