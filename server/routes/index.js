const express = require('express')

const Router = express.Router()
const blog = require('./blog')

Router.get('/', (req, res, next) => {
    res.status(200).json({
        "message" : "App Running"
    })
})

Router.use('/blog', blog)

module.exports = Router