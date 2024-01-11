require('dotenv').config();

// Import the Twilio module
const twilio = require('twilio');
const { WireMockClient } = require('./WireMockClient');
const { RequestClient } = twilio;

// Twilio credentials from your account
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const accountSid = process.env.TWILIO_ACCOUNT_SID;

// Create a Twilio client with your credentials using custom httpClient
const client = twilio(apiKey, apiSecret, {
    accountSid,
    httpClient: new WireMockClient('https://twilio.wiremockapi.cloud', new RequestClient())
});

// Set the phone numbers for the sender (your Twilio number) and the recipient
const fromPhoneNumber = '+18665942889';
const toPhoneNumber = '+18777804236';

// Message content
const messageBody = 'Hello, from WireMock';

// Send the SMS
client.messages
  .create({
    body: messageBody,
    from: fromPhoneNumber,
    to: toPhoneNumber,
  })
  .then((message) => {
    console.log(`Message sent with:`);
    console.log(`   SID:  ${message.sid}`);
    console.log(`   body: ${message.body}`);
  })
  .catch((error) => {
    console.error('Error sending SMS:', error);
  });