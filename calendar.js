/**
 * Google Calendar API/OAuth2.0
 */
const { google }  = require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    // redirect url after sucessful authentication
    'http://localhost:443/googleoauthcallback'
);

// Automatically obtain refresh tokens for Google Calendar API calls when needed
oauth2Client.on('tokens', (tokens => {
    if (tokens.refresh_token) {
        console.log(tokens.refresh_token);
        oauth2Client.setCredentials({
            refresh_token: tokens.refresh_token
        })
    }
}))

const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
        // permissions to access and add new events to user's google calendar
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
    ]
});

// create a new calendar object to create events on the user's primary calendar
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

module.exports = {
    oauth2Client,
    authUrl,
    calendar
}

