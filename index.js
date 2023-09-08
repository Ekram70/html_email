const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const port = 9000;
const receivers = require('./data/receivers');
const emailBody = require('./data/emailBody');

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.FROM_EMAIL,
  bcc: receivers,
  subject: process.env.EMAIL_SUBJECT,
  html: emailBody,
};

transporter.sendMail(mailOptions, function (err, info) {
  if (err) console.log(err);
  else console.log(info);
});

app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`)
);
