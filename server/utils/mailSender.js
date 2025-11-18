import initializeMailer from "../config/mailer.js";
import MailSettings from "../models/mailsettings.js";
require("dotenv").config();

const sendMail = async (toAddress, subject, html) => {
  try {
    const mailData = await MailSettings.findOne();
    const mailer = await initializeMailer();
    const info = await mailer.sendMail({
      from: mailData.username,
      to: toAddress,
      subject: subject,
      html: html,
    });
    console.log("Message sent: %s", info.messageId, "TIME: ", Date.now());
    console.log(info.accepted);
    console.log(info.rejected);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendMail;