const router = require('express').Router();
const articleRouter = require('./article');
const userRouter = require('./user');

router.use('/articles', articleRouter);
router.use('/users', userRouter);

module.exports = router;