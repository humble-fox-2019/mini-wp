const multer = require('multer')

function errorHandler(err, req, res, next) {

  console.log(err)

  const status = err.status || 500
  const message = err.message || 'Internal server error'

  if(err.name === 'ValidationError') {
    const errors = []

    for(error in err.errors) {
      errors.push(err.errors[error].message)
    }

    res.status(400).json({
      errors
    })
  }else if(err.name === 'MulterError') {
    if(err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({
        errors: ['File too large']
      })
    }
  }else if(err.name === 'JsonWebTokenError') {
    res.status(401).json({
      errors: ['Not authenticated user']
    })
  }else{
    res.status(status).json({
      errors: [message]
    })
  }

}

module.exports = errorHandler