import nodemailer from "nodemailer";
import { asyncHandler } from "../src/utils/asyncHandler";

const trasnporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASSWORD
    }
})


const sendRSVPEmail = asyncHandler(async (reciever, forEvent) => {

    const fullName = reciever.fullName;
    const title = forEvent.title;
    const subtitle = forEvent.subtitle;
    const date = forEvent.date;
    const time = forEvent.time;
    const email = forEvent.email;

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
    
    <p style="font-size: 15px; color: #555; margin-top: 30px;">
      Stay tuned for more updates! Make sure to join our Discord/Slack and follow us on social media to get the latest info.
    </p>
    
    <p style="font-size: 14px; color: #888; margin-top: 30px;">- The Devfolio Team</p>
  </div>
`;

})