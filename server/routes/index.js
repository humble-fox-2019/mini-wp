const express = require('express');
const router = express.Router();
const user_routes = require('./user_routes')
const article_routes = require('./article_routes')


router.use('/user'  , user_routes )
router.use('/article' , article_routes)

module.exports = router
