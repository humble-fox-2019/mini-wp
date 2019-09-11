const multer = require('multer')

function errorHandler(err, req, res, next) {

  const status = err.status || 500
  const message = err.message || 'Internal server error'

  if(err instanceof multer.MulterError) {
    console.log('Yaaasadsasdasd')
  }

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
  }else{
    res.status(status).json({
      errors: [message]
    })
  }

}

module.exports = errorHandler