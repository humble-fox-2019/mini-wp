const router = require('express').Router();
const articleRoute = require('./articleRoute');
const userRoute = require('./userRoute');
const gcs = require('../helpers/gcs');

const UserController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.status(200).json({
        "message": 'ok'
    });
});

router.post('/signup', gcs.multer.single('image'), gcs.sendUploadToGCS, UserController.signup);
router.post('/signin', UserController.signin);

router.use('/articles', articleRoute);
router.use('/users', userRoute);

router.get('/*', (req, res, next) => {
    next({ statusCode: 404, msg: 'Route not found' });
});

module.exports = router
