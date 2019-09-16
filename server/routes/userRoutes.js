const router = require('express').Router();
const UserController = require('../controllers/userController');
const { multer, sendUploadToGCS, getPublicUrl } = require('../middlewares/image');

router.post('/register', multer.single('file'), sendUploadToGCS, UserController.create);
router.post('/login', UserController.login);

module.exports = router;