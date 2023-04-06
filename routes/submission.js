let express = require('express');
let router = express.Router();
let { csClass } = require('../csClass');
let { csClasses } = require('../classes');
let { calendar } = require('../calendar');

// POST class submission page.
router.post('/', (req, res) => {
    // access HTML form data with JSON
    let JSONstring = JSON.stringify(req.body);
    let entries = JSON.parse(JSONstring);

    // iterate through each class option
    Object.values(entries).forEach(index => {
        let currentClass = csClasses[index - 1];
        console.log(currentClass.start.getHours());
        // the UNTIL property in RRULE needs a date in the format of YYYYMMDD
        let endDateStr = (String(currentClass.getEndDate.getFullYear()));
        let formatMonth, formatDay;

        if ((String(currentClass.getEndDate.getMonth() + 1)).length == 1) {
            formatMonth = '0' + (String(currentClass.getEndDate.getMonth() + 1));
        } 
        else {
            formatMonth = (String(currentClass.getEndDate.getMonth() + 1));
        }
        if ((String(currentClass.getEndDate.getDate())).length == 1) {
            formatDay = '0' + (String(currentClass.getEndDate.getDate()));
        } 
        else {
            formatDay = (String(currentClass.getEndDate.getDate()));
        }
        endDateStr = endDateStr.concat(formatMonth, formatDay);

        // initialize empty event object
        let event = {
            summary: null,
            start: {
                dateTime: null,
                timeZone: 'America/Los_Angeles',
            },
            end: {
                dateTime: null,
                timeZone: 'America/Los_Angeles',
            },
            colorId: 11,
            recurrence: null,
            location: null,
            description: null,
        }

        console.log(event);

        // fill in empty event object properties with the chosen class
        event.summary = currentClass.getName;
        event.start.dateTime = currentClass.getStartDate;
        event.end.dateTime = currentClass.getStartDateEndTime;
        event.recurrence = [`RRULE:FREQ=WEEKLY;BYDAY=${currentClass.getClassDays};UNTIL=${endDateStr}`];

        // Check to see if the user is busy at the chosen time slot for the class
        calendar.freebusy.query({
            resource: {
                timeMin: event.start.dateTime,
                timeMax: event.end.dateTime,
                timeZone: 'America/Los_Angeles',
                items: [{ id: 'primary' }],
            },
        }, (error, response) => {
            if (error) return console.error('Free Busy Query Error: ', error);
            // creates an array of events on the calendar that are also in the same allotted time slot
            const eventsArray = response.data.calendars.primary.busy;
            // Check if there are no events on the calendar in the same time slot
            if (eventsArray.length == 0) {
                // insert a new calendar event
                calendar.events.insert({
                    calendarId: 'primary',
                    resource: event
                }, error => {
                    if (error) return console.error('Calendar Event Creation Error: ', error);
                    return;
                });

                // Successful redirect if classes could be added to user's google calendar
                return res.redirect('/calendar-success');
            }
            // Complain to the user that they are busy on the allotted time slot in their primary calendar
            scheduleConflict = true;

            module.exports = event;
            return res.redirect('/calendar-failure');
        });
    });
})

module.exports = router;