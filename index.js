require("dotenv").config();
const Koa = require("koa");
const axios = require("axios");
const cron = require("node-cron");
const app = new Koa();
const phoneNumber = process.env.MY_PHONE_NUMBER;

const fetchRandomFact = async () => {
  const {
    data: { text }
  } = await axios("https://uselessfacts.jsph.pl/random.json?language=en");
  return text;
};

const sendTextMessage = async phoneNumber => {
  const textMessage = await fetchRandomFact();
  const accountSid = process.env.TWILIO_ACCOUNT;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  const response = await client.messages.create({
    body: textMessage,
    from: process.env.TWILIO_NUMBER,
    to: phoneNumber
  });
  console.log({ sid: response.sid, status: response.status });
};

// Scheduled to be sent at 7:30am everyday
cron.schedule("0 30 7 * * *", () => sendTextMessage(phoneNumber));

app.listen(process.env.PORT || 3000);
