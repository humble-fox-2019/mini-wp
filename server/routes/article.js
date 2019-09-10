const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.json({message: 'connected'});
})

module.exports = router;