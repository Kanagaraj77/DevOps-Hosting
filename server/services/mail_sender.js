import dotenv from "dotenv";
import config from "../config.js";
import initializeMailer from "../config/mailer.js";

dotenv.config({ path: `.env.${config.environment}` });

const sendMail = async (toAddress, subject, html) => {
  try {
    const mailer = await initializeMailer();
    const info = await mailer.sendMail({
      from: process.env.USERNAME,
      to: toAddress,
      subject: subject,
      html: html,
    });
    console.log("Message sent: %s", info.messageId, "TIME: ", Date.now());
    console.log('Accepted: ',info.accepted);
    console.log('Rejected: ',info.rejected);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendMail;
