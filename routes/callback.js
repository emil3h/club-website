let express = require('express');
let router = express.Router();
let { oauth2Client } = require('../calendar');

// GET callback page.
router.get('/', (req, res, next) => {
    let code = req.query.code;
    // Get access tokens from Google after successful authentication and redirection
    oauth2Client.getToken(code, (error, tokens) => {
        if (!error) {
            // console.log(tokens);
            oauth2Client.credentials = tokens;
        }
    });
    res.redirect('/cs-class-scheduling');
})

module.exports = router;