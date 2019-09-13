
const router = require('express').Router()
const articleRouter = require('./article')
const userRouter = require('./user')
const { authentication } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.status(200).json({
        message: `app is running`
    })
})

router.use('/users', userRouter)

router.use(authentication)
router.use('/articles', articleRouter)

module.exports = router