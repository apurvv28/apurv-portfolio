import nodemailer from "nodemailer";
import { getSubscribers } from "./subscribers-storage";
import type { BlogRecord } from "./blog-storage";

export async function notifySubscribers(blog: BlogRecord): Promise<void> {
  const host = process.env.SMTP_HOST?.trim();
  const port = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASSWORD?.trim();
  const from = process.env.SMTP_FROM?.trim() || `"Apurv Saktepar" <noreply@apurvv.vercel.app>`;

  if (!host || !port || !user || !pass) {
    console.warn("SMTP email credentials are not fully configured. Email notifications bypassed.");
    return;
  }

  try {
    const subscribers = await getSubscribers();
    if (subscribers.length === 0) {
      console.log("No subscribers found. Skipping email notifications.");
      return;
    }

    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port),
      secure: port === "465", // true for port 465, false for 587 / other ports
      auth: { user, pass }
    });

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000; color: #fff; border: 1px solid #333; border-radius: 10px;">
        <h2 style="color: #fff; text-align: center; border-bottom: 1px solid #333; padding-bottom: 10px;">New Transmission from Apurv Saktepar</h2>
        <div style="padding: 20px 0;">
          <h3 style="color: #fff; font-size: 24px; margin-top: 0;">${blog.title}</h3>
          <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6;">${blog.excerpt}</p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://apurvv.vercel.app/blogs/${blog.slug}" style="background-color: #fff; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 5px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Read Post</a>
          </div>
        </div>
        <div style="border-top: 1px solid #333; padding-top: 15px; text-align: center; font-size: 12px; color: #737373;">
          You received this because you subscribed to Apurv Saktepar's Portfolio.
        </div>
      </div>
    `;

    console.log(`Sending SMTP notifications for new blog "${blog.title}" to ${subscribers.length} subscribers...`);

    // Send emails in parallel, catch individual failures so other sends continue
    await Promise.all(
      subscribers.map(async (email) => {
        try {
          await transporter.sendMail({
            from,
            to: email,
            subject: `New Blog Post: ${blog.title}`,
            html: emailHtml
          });
        } catch (error) {
          console.error(`Failed to send email to ${email}:`, error);
        }
      })
    );

    console.log("Finished sending email notifications.");
  } catch (error) {
    console.error("Failed to execute SMTP notifications:", error);
  }
}
