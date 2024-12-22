import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const client = new MailtrapClient({
  token: process.env.MAIL_TRAP_TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Verification code ",
};
const recipients = [
  {
    email: "ppoujan@gmail.com",
  },
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);
