const router = require('express').Router();
const articleRoute = require('./articleRoute');

const UserController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.status(200).json({
        "message": 'ok'
    });
});

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.use('/articles', articleRoute);

router.get('/*', (req, res, next) => {
    next({ statusCode: 404, msg: 'Route not found' });
});

module.exports = router
