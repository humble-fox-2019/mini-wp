const router = require('express').Router();
const articleRouter = require('./article');
const userRouter = require('./user');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'connected'
    });
})
router.use('/articles', articleRouter);
router.use('/users', userRouter);

module.exports = router;