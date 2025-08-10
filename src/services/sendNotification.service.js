import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD
  }
})

console.log("Hello Just a testing line");


const sendRegistrationConfirmation = async (receiver, forEvent) => {
  const fullName = receiver.fullName;
  const title = forEvent.title;
  const subtitle = forEvent.subtitle;
  const date = forEvent.date;
  const time = forEvent.time;
  const email = receiver.email;

  console.log("Preparing to send email to:", email);

  const messageBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e0e0e0;">

      <!-- Header -->
      <div style="background: linear-gradient(90deg, #4f46e5, #6366f1); padding: 20px; text-align: center; color: #fff;">
        <h1 style="margin: 0; font-size: 24px;">🎉 Registration Confirmed!</h1>
      </div>

      <!-- Body -->
      <div style="padding: 25px;">
        <p style="font-size: 16px; color: #333; margin-top: 0;">
          Hi <strong>${fullName}</strong>,
        </p>
        <p style="font-size: 16px; color: #333;">
          Congratulations! You are officially registered for:
        </p>
        <p style="font-size: 18px; font-weight: bold; color: #4f46e5; margin: 5px 0;">
          ${title}
        </p>
        <p style="font-size: 15px; color: #666; font-style: italic; margin-top: 0;">
          ${subtitle}
        </p>

        <!-- Event Details -->
        <div style="margin-top: 20px; padding: 15px; background-color: #f9f9ff; border-left: 4px solid #4f46e5; border-radius: 6px;">
          <p style="margin: 0; font-size: 15px;"><strong>📅 Date:</strong> ${new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p style="margin: 0; font-size: 15px;"><strong>⏰ Time:</strong> ${time}</p>
        </div>


        <!-- Note -->
        <p style="font-size: 14px; color: #555; margin-top: 25px; line-height: 1.5;">
          We can't wait to see you there!
          Follow us on our community channels and stay tuned for more updates.
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 13px; color: #888;">
        © ${new Date().getFullYear()} CODEX ITER. All rights reserved.
      </div>

    </div>`
    ;

  const mailOptions = {
    from: `"CODEX ITER" <${process.env.GMAIL_ID}>`,
    to: email.trim(),
    subject: `Registration Confirmation for ${title}`,
    html: messageBody
  };

  console.log("Mail options prepared:", mailOptions);

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Nodemailer error:", error);
        return reject(error);
      }
      console.log("Email sent successfully:", info.response);
      resolve(true);
    });
  });
};


export { sendRegistrationConfirmation };