const router = require('express').Router();
const UserController = require('../controllers/user');
const { authentication } = require('../middlewares/authentication');

router.get('/', authentication, UserController.getUser);

router.post('/signup', UserController.signup);

router.post('/signin', UserController.signin);

router.post('/signin/google', UserController.googleSignIn);

module.exports = router;