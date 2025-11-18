import sendMail from "../services/mail_sender.js";

export const createContactForm = async (req, res) => {
  try {
    const contactForm = req.body;
    console.log('contactForm', process.env.TO);
    const htmlContent = `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${contactForm.fullName}</p>
      <p><strong>Email:</strong> ${contactForm.email}</p>
      <p><strong>Phone:</strong> ${contactForm.phone}</p>
      <p><strong>Message:</strong> ${contactForm.message}</p>
    `;
    
    await sendMail(
      process.env.TO,
      "New Contact Form Submission",
      htmlContent
    );

    res.status(201).json({ success: true, data: contactForm });
  } catch (error) {
    console.error("Error processing the contact form:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
