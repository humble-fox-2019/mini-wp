const express = require('express');
const postRoute = require('./post');
const userRoute = require('./user');
const router = express.Router();
	
router.use('/posts', postRoute);
router.use('/users', userRoute)

module.exports = router;