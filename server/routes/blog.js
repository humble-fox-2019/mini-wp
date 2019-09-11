const express  = require('express')
const controllers = require('../controllers')

const Router = express.Router()

Router.route('/')
    .get(controllers.Blog.index)
    .post(controllers.Blog.store)

module.exports = Router