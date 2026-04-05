import { NextResponse } from "next/server";
import {
  escapeHtml,
  getMailSetupHelpMessage,
  getStringField,
  isValidEmail,
  MailConfigError,
  sendPortfolioEmail,
} from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const name = getStringField(body.name);
    const email = getStringField(body.email);
    const message = getStringField(body.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedMessage = escapeHtml(message).replace(/\n/g, "<br>");

    await sendPortfolioEmail({
      fromLabel: "Portfolio Contact",
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
        <p><strong>Name:</strong> ${escapedName}</p>
        <p><strong>Email:</strong> ${escapedEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${escapedMessage}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ ERROR sending email:", error);

    if (error instanceof MailConfigError) {
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? getMailSetupHelpMessage(error)
              : "Contact form is temporarily unavailable. Please try again later.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
