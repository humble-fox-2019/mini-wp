const router = require('express').Router()
const userRouter = require('./user')
const articleRouter = require('./article')
router.get('/', (req, res, next)=>{
    res.status(200).json({message: "server is on!"})
})

router.use('/users', userRouter)
router.use('/articles', articleRouter)
module.exports = router