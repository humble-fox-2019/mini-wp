module.exports = (err, req, res, next) => {
  console.log(err, 'error handler');
  if (err.name === 'JsonWebTokenError') {
    res.status(400).json({ message: err.message })
  } else if (err.name === 'ValidationError') {
    const errors = []
    for (let key in err.errors) {
      errors.push(err.errors[key].message)
    }
    res.status(400).json({ errors })
  } else if (err.name === 'MongoError') {
    res.status(400).json({ message: 'Email already registered' })
  } else {
    const status = err.status || 500
    const message = err.message || 'Internal server error'

    res.status(status).json({ message })
  }
}