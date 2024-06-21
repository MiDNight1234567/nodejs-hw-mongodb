import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';
import { env } from './env.js';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  secure: false,
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
  // tls: {
  //   // do not fail on invalid certs
  //   rejectUnauthorized: false
  // }
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
