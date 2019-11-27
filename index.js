require("dotenv").config();
const Koa = require("koa");
const axios = require("axios");
const cron = require("node-cron");
const app = new Koa();
const port = process.env.PORT || 3000;

const fetchRandomFact = async () =>
  await axios("https://uselessfacts.jsph.pl/random.json?language=en");

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
cron.schedule("0 50 15 * * *", async () =>
  sendTextMessage(await fetchRandomFact())
);

app.listen(port, () =>
  console.log(`running text messaging service on port ${port}...`)
);
