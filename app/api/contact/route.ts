import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // 🔥 DIRECT SMTP CONFIG (TEMPORARY – DO NOT COMMIT REAL CREDENTIALS)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: "info@yehtet.com",        // 👈 your email
        pass: "yuoadoyeefcjgzvw", // 👈 your 16-char Gmail app password
      },
    });

    // Optional: verify connection
    await transporter.verify().catch((err: any) => {
      console.error("SMTP Verify Error:", err);
      throw err;
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <info@yehtet.com>`,
      to: "info@yehtet.com", // where you receive the message
      subject: `New message from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ ERROR sending email:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
