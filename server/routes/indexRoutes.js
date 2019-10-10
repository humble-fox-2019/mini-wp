const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const articleRoutes = require('./articleRoutes.js');

router.use('/users', userRoutes);
router.use('/articles', articleRoutes);

module.exports = router;