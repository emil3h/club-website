let express = require('express');
let router = express.Router();
let { authUrl } = require('../calendar');

// GET home page.
router.get('/', (req, res, next) => {
    res.render('index', { loginLink: authUrl });
})

module.exports = router;