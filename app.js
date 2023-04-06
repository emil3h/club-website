require('dotenv').config();
const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const bodyParser = require('body-parser');
const express = require('express');
const { rejects } = require('assert');
const app = express();
const PORT = 443;

// set viewing engine for express application
app.set('view engine', 'ejs');
// url parser
app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT, () => {
    console.log(`Web server created at 127.0.0.1:${PORT} for CS Class Calendar Scheduling App.`);
});

// Load stylesheets, javascripts, and images
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Routers
 */
const indexRouter = require('./routes/index');
const callbackRouter = require('./routes/callback');
const schedulingRouter = require('./routes/scheduling');
const submissionRouter = require('./routes/submission');
const calSuccessRouter = require('./routes/calendarsuccess');
const calFailureRouter = require('./routes/calendarfailure');
/**
 * Routes
 */
app.use('/', indexRouter);
app.use('/googleoauthcallback', callbackRouter);
app.use('/cs-class-scheduling', schedulingRouter);
app.use('/cs-class-submission', submissionRouter);
app.use('/calendar-success', calSuccessRouter);
app.use('/calendar-failure', calFailureRouter);
