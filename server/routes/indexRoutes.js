const express = require('express')
const router = express.Router()
const articleRoutes = require('../routes/articleRoutes')
const userRoutes = require('../routes/userRoutes')
const imageRoutes = require('../routes/imageRoutes')


router.get('/', function(req,res){
    res.send('homepage')
})
router.use('/images', imageRoutes)
router.use('/articles', articleRoutes)
router.use('/users', userRoutes)




module.exports = router