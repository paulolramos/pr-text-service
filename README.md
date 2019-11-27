## Send Random facts to your phone using [Twilio](https://www.twilio.com/)

### Create .env in project's root directory

```bash

touch .env

```

### Add these to .env

- TWILIO_ACCOUNT=SECRET
- TWILIO_AUTH_TOKEN=GET_YOUR_OWN
- TWILIO_NUMBER=TOP_SECRET_NUMBER
- MY_PHONE_NUMBER=YOU_WISH

##### Configure how often you want random facts sent to your cellularz device (pre-configured to send at 7:30am errday. Rise and Shine!).

###### Check out the docz for [node-cron](https://www.npmjs.com/package/node-cron)

```javascript
cron.schedule("0 30 7 * * *", async () =>
  sendTextMessage(await fetchRandomFact())
);
```

#### Deploy it somewhere. Remember, it's intented to run continuouslyyy...
