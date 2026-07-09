import nodemailer from "nodemailer";
import { getSubscribers } from "./subscribers-storage";
import type { BlogRecord } from "./blog-storage";

export async function notifySubscribers(blog: BlogRecord): Promise<void> {
  const host = process.env.SMTP_HOST?.trim();
  const port = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASSWORD?.trim();
  const from = process.env.SMTP_FROM?.trim() || `"Apurv Saktepar" <noreply@apurvv.me>`;

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
  <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; padding: 30px; background: radial-gradient(ellipse at center, #0a0e27 0%, #000000 100%); border: 1px solid #2a2a5a; border-radius: 15px; box-shadow: 0 0 40px rgba(100, 100, 255, 0.1);">
    
    <!-- Stars background decoration -->
    <div style="position: relative; overflow: hidden;">
      <div style="position: absolute; top: 10px; left: 20px; font-size: 8px; color: #ffffff; opacity: 0.3; letter-spacing: 5px;">✦ ✧ ✦ ✧ ✦</div>
      <div style="position: absolute; bottom: 10px; right: 20px; font-size: 8px; color: #ffffff; opacity: 0.2; letter-spacing: 8px;">✦ ✧ ✦ ✧</div>
      
      <!-- Header with astronaut emoji -->
      <div style="text-align: center; padding: 10px 0 20px 0; border-bottom: 1px solid rgba(100, 149, 237, 0.3);">
        <div style="font-size: 40px; margin-bottom: 5px;">🚀</div>
        <h2 style="color: #7eb8ff; font-family: 'Courier New', monospace; font-size: 18px; letter-spacing: 3px; text-transform: uppercase; margin: 0; text-shadow: 0 0 20px rgba(100, 149, 237, 0.3);">
          ⚡ NEW BLOG PUBLISHED ⚡
        </h2>
        <p style="color: #6a8caf; font-size: 12px; margin: 5px 0 0 0; letter-spacing: 1px; font-family: 'Courier New', monospace;">
          ▸ From the Desk of Apurv Saktepar ◂
        </p>
      </div>
      
      <!-- Main content -->
      <div style="padding: 25px 15px; position: relative;">
        <!-- Decorative orbit rings -->
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; height: 80%; border: 1px solid rgba(100, 149, 237, 0.05); border-radius: 50%;"></div>
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 95%; height: 90%; border: 1px solid rgba(100, 149, 237, 0.03); border-radius: 50%;"></div>
        
        <!-- Astronaut icon -->
        <div style="text-align: center; font-size: 32px; margin-bottom: 10px;">🧑‍🚀</div>
        
        <h3 style="color: #b8d8ff; font-family: 'Courier New', monospace; font-size: 22px; margin: 10px 0 15px 0; text-align: center; text-shadow: 0 0 30px rgba(100, 149, 237, 0.2); letter-spacing: 1px;">
          ${blog.title}
        </h3>
        
        <div style="height: 2px; background: linear-gradient(to right, transparent, #4a6a9a, transparent); margin: 15px 0; width: 60%; margin-left: auto; margin-right: auto;"></div>
        
        <p style="color: #a0c4e8; font-size: 15px; line-height: 1.8; text-align: center; font-family: 'Courier New', monospace; padding: 0 10px;">
          ${blog.excerpt}
        </p>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://apurvv.me/blogs/${blog.slug}" style="display: inline-block; background: linear-gradient(135deg, #4a6a9a, #2a4a7a); color: #ffffff; padding: 14px 35px; text-decoration: none; font-family: 'Courier New', monospace; font-weight: bold; border-radius: 30px; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; border: 1px solid #6a8abf; box-shadow: 0 0 30px rgba(100, 149, 237, 0.2); transition: all 0.3s ease;">
            🛸 Read Full Blog
          </a>
        </div>
        
        <!-- Small satellite decoration -->
        <div style="text-align: center; margin-top: 20px; font-size: 14px; color: #4a6a8a; letter-spacing: 4px;">
          ● ◯ ● ◯ ●
        </div>
      </div>
      
      <!-- Footer -->
      <div style="border-top: 1px solid rgba(100, 149, 237, 0.2); padding-top: 18px; text-align: center; font-size: 11px; color: #4a6a7a; font-family: 'Courier New', monospace; letter-spacing: 1px;">
        <div style="margin-bottom: 5px;">📡 RECEIVED VIA DEEP SPACE NETWORK</div>
        <div style="color: #3a5a6a; font-size: 10px;">
          You received this interstellar transmission because you're orbiting<br>
          Apurv Saktepar's Portfolio. Stay curious, space traveler. ✦
        </div>
        <div style="margin-top: 10px; font-size: 8px; color: #2a4a5a; letter-spacing: 2px;">
          ⚡ SIGNAL STRENGTH: ▰▰▰▰▰▰▰▰▰▰ 100% ⚡
        </div>
      </div>
    </div>
  </div>
`;

console.log(`🚀 Sending interstellar transmission for new blog "${blog.title}" to ${subscribers.length} subscribers across the cosmos...`);

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
