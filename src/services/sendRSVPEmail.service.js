import nodemailer from "nodemailer";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD
  }
})

const SECRET = process.env.ACCESS_TOKEN_SECRET;

function generateExpiringLink(userId, baseUrl, eventId) {
  const token = jwt.sign({ uid: userId, eventId }, SECRET, { expiresIn: "72h" });
  return `${baseUrl}?token=${token}`;
}




const sendRSVPEmail = asyncHandler(async (reciever, forEvent) => {

  const fullName = reciever.fullName;
  const title = forEvent.title;
  const subtitle = forEvent.subtitle;
  const date = forEvent.date;
  const time = forEvent.time;
  const email = reciever.email;
  const eventId = forEvent._id;
  const usedId = reciever._id;

  const rsvpLink = generateExpiringLink(usedId, `${process.env.BASE_URL}/api/v1/registers/rsvp`, eventId);

  const messageBody = `
  <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
    <h2 style="color: #0c0c0c;">🎉 You're Officially Registered, ${fullName}!</h2>
    <p style="font-size: 16px; color: #333;">
      Thank you for RSVPing to <strong>${title}</strong> — <em>${subtitle}</em>. 
      We’re excited to have you with us!
    </p>
    
    <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-left: 4px solid #4f46e5; border-radius: 8px;">
      <p style="margin: 0;"><strong>📅 Date:</strong> ${new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p style="margin: 0;"><strong>⏰ Time:</strong> ${time}</p>
    </div>

    <p>
      <a href="${rsvpLink}" style="display:inline-block;padding:10px 20px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:5px;">
      Confirm Your RSVP within 72 hours
      </a>
    </p>
    
    <p style="font-size: 15px; color: #555; margin-top: 30px;">
      Stay tuned for more updates! Make sure to join our Discord/Slack and follow us on social media to get the latest info.
    </p>
    
    <p style="font-size: 14px; color: #888; margin-top: 30px;">- The CODEX ITER Team</p>
  </div>
`;

  const mailOptions = {
    from: `"CODEX ITER " ${process.env.GMAIL_ID}`,
    to: email,
    subject: `RSVP for ${title}`,
    html: messageBody
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return reject(new Error("Email failed")); // reject with an error
      }
      console.log("Email sent:", info.response);
      resolve(true); // ✅ Always resolve with true on success
    });
  });

});

export { sendRSVPEmail };