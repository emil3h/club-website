let express = require('express');
let router = express.Router();

// GET calendar failure page.
router.get('/', (req, res, next) => {
    res.render('calendarresponse', {
        title: 'CSS - Google Calendar Event Creation Failure',
        response: 'There is a scheduling conflict between the CS classes you selected. Please try again.'
    })
})

module.exports = router;