const router = require('express').Router()
const articleRouter = require('./article')

router.get('/', (req, res) => res.send('Hello World!'))
router.use('/articles', articleRouter)

module.exports = router