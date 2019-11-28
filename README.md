## Send random facts to your phone using [Twilio](https://www.twilio.com/)

### Create .env in project's root directory

```bash
touch .env
```

### Add these environment variables to .env

- TWILIO_ACCOUNT=SECRET
- TWILIO_AUTH_TOKEN=GET_YOUR_OWN
- TWILIO_NUMBER=TOP_SECRET_NUMBER
- MY_PHONE_NUMBER=YOU_WISH

##### Configure how often you want random facts sent to your cellularz device (pre-configured to send at 7:30am errday (UTC Time). Rise and Shine!).

###### Check out the docz for [node-cron](https://www.npmjs.com/package/node-cron)

```javascript
cron.schedule("0 30 15 * * *", async () => {
  const randomFact = await fetchRandomFact();
  sendTextMessage(randomFact);
});
```

#### Deploy it somewhere. Remember, it's intented to run continuouslyyy...

I deployed it to AWS elastic beanstalk and works like a charm.

Use the bash script _zip-for-aws.sh_ to zip the necessary files to deploy to AWS. You will have to set the environment variables via the elastic beanstalk settings, so no need to include .env file.
