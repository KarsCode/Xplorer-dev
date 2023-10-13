// import { google, calendar_v3 } from 'googleapis';

// // Your OAuth 2.0 credentials
// const credentials = {
//   client_id: '789004330182-ipbjiljtbsa2p1jmnq0vuch2d46aaq7d.apps.googleusercontent.com',
//   client_secret: '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',
//   redirect_uris: ['http://localhost:3000'],
// };

// const oauth2Client = new google.auth.OAuth2(
//   credentials.client_id,
//   credentials.client_secret,
//   credentials.redirect_uris[0]
// );

// interface CalendarEvent {
//     summary: string;
//     description: string;
//     start: {
//       dateTime: string;
//     };
//     end: {
//       dateTime: string;
//     };
//   }
  
//   export const addEventToGoogleCalendar = async () => {
//     try {
//       const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  
//       const event: calendar_v3.Schema$Event = {
//         summary: 'Test Event',
//         description: 'This is a test event description',
//         start: {
//           dateTime: '2023-10-12T12:00:00',
//         },
//         end: {
//           dateTime: '2023-10-12T13:00:00',
//         },
//       };
  
//       await calendar.events.insert({
//         calendarId: 'primary',
//         requestBody: event,
//       });
  
//       console.log('Event added to Google Calendar');
//     } catch (error) {
//       console.error('Error adding event to Google Calendar:', error);
//     }
//   };

