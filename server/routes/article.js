const router = require('express').Router();
const controller = require('../controllers/article');
const {authentication} = require('../middlewares/authentication')

//router.use(authentication)
router.post('/create',controller.create)
router.get('/getAll',controller.find)
router.get('/filter',controller.filterByTitle)
router.patch('/update/:id',controller.update)
router.delete('/delete/:id',controller.delete)


module.exports = router;