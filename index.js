require("dotenv").config();
const Koa = require("koa");
const axios = require("axios");
const cron = require("node-cron");
const app = new Koa();
const port = process.env.PORT || 3000;

const fetchRandomFact = async () => {
  const {
    data: { text }
  } = await axios("https://uselessfacts.jsph.pl/random.json?language=en");
  return text;
};

const sendTextMessage = async textMessage => {
  const phoneNumber = process.env.MY_PHONE_NUMBER;
  const accountSid = process.env.TWILIO_ACCOUNT;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  const { sid, status, body } = await client.messages.create({
    body: textMessage,
    from: process.env.TWILIO_NUMBER,
    to: phoneNumber
  });

  console.log({ sid, status, body });
};

// Scheduled to be sent at 7:30am everyday
// hour is entered as UTC time,
// as I have it deployed in aws (check your server's time)
cron.schedule("0 30 3 * * *", async () => {
  const randomFact = await fetchRandomFact();
  sendTextMessage(randomFact);
});

app.listen(port, () => {
  const today = new Date();
  const UTCInfo = `(UTC: ${today.getUTCMonth()}/${today.getUTCDate()}/${today.getUTCFullYear()} | Hr: ${today.getUTCHours()} Min: ${today.getUTCMinutes()}):`;
  console.log(`${UTCInfo} running text messaging service on port ${port}...`);
});
