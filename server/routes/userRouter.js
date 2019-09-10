const express = require ('express')
const router = express.Router()
const UserControler = require('../controllers/userController')

router.post('/create', UserControler.create)
// router.post('/login', (req, res)=>{
//     res.send('hei')
// })
router.post('/login', UserControler.login)

module.exports = router