const router = require('express').Router();
const articleRoute = require('./articleRoute');
const userRoute = require('./userRoute');

const UserController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.status(200).json({
        "message": 'ok'
    });
});

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.post('/Gsignin', UserController.Gsignin);

router.use('/articles', articleRoute);
router.use('/users', userRoute);

router.get('/*', (req, res, next) => {
    next({ statusCode: 404, msg: 'Route not found' });
});

module.exports = router
