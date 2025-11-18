"use strict";
import nodemailer from 'nodemailer';
import config from '../config.js';
import dotenv from "dotenv";

dotenv.config({ path: `.env.${config.environment}` });

const initializeMailer = async () => {
  try {
    // const transporter = nodemailer.createTransport({
    //   name: process.env.SERVERNAME,
    //   host: process.env.HOST,
    //   port: process.env.MAILPORT,
    //   auth: {
    //     user: process.env.USERNAME,
    //     pass: process.env.PASSWORD,
    //   },
    // });
    const transporter = nodemailer.createTransport({
      name: "md-ht-8",
      host: "mail.infygain.com",
      port: 465,
      auth: {
        user: 'dev@infygain.com',
        pass: "Infy@2021",
      },
    });

    await transporter.verify();
    console.log("Mailer connection successful");
    return transporter;
  } catch (err) {
    console.error("Error initializing mailer:", err);
    throw err;
  }
};
// console.log("Mailer initialized ", process.env.MAILPORT);
// console.log("Mailer initialized ", process.env.HOST);
// initializeMailer()

export default initializeMailer;
