let express = require('express');
let router = express.Router();

// GET calendar success page.
router.get('/', (req, res, next) => {
    res.render('calendarresponse', {
        title: 'CSS - Google Calendar Event Creation Success',
        response: 'Your CS classes were successfully added to your primary Google calendar!'
    });
})

module.exports = router;