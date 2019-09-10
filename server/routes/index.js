
const router = require('express').Router()
const articleRouter = require('./article')

router.get('/', (req, res) => {
    res.status(200).json({
        message: `app is running`
    })
})

router.use('/articles', articleRouter)

module.exports = router