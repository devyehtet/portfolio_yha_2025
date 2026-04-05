import { NextResponse } from "next/server";
import {
  escapeHtml,
  getStringField,
  getMailSetupHelpMessage,
  MailConfigError,
  sendPortfolioEmail,
} from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const name = getStringField(body.name);
    const email = getStringField(body.email);
    const company = getStringField(body.company);
    const service = getStringField(body.service);
    const message = getStringField(body.message);

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Name, email, service, and message are required." },
        { status: 400 }
      );
    }

    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedCompany = company ? escapeHtml(company) : "Not provided";
    const escapedService = escapeHtml(service);
    const escapedMessage = escapeHtml(message).replace(/\n/g, "<br>");

    await sendPortfolioEmail({
      fromLabel: "Book a Call Request",
      toEnv: "BOOKING_TO_EMAIL",
      subject: `Book a Call request from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Company: ${company ?? "Not provided"}
Service: ${service}

Message:
${message}
      `,
      html: `
        <h2>New Book a Call Request</h2>
        <p><strong>Name:</strong> ${escapedName}</p>
        <p><strong>Email:</strong> ${escapedEmail}</p>
        <p><strong>Company:</strong> ${escapedCompany}</p>
        <p><strong>Interested In:</strong> ${escapedService}</p>
        <p><strong>Message:</strong></p>
        <p>${escapedMessage}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ ERROR sending booking request:", error);

    if (error instanceof MailConfigError) {
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? getMailSetupHelpMessage(error)
              : "Booking form is temporarily unavailable. Please try again later.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send booking request" },
      { status: 500 }
    );
  }
}
