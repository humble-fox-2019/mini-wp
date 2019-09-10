const router = require('express').Router();
const articleRouter = require('./article');

router.use('/articles', articleRouter);

module.exports = router;