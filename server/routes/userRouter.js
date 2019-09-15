const express = require ('express')
const router = express.Router()
const UserControler = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

router.post('/create', UserControler.create)
router.post('/login', UserControler.login)
router.post('/signGoogle', UserControler.signInGoogle)
router.get('/account', authentication, (req,res)=>{
    res.status(200).json({
        name : req.decoded.name
    })
})
module.exports = router