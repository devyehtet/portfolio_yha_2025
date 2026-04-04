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
    const company = getStringField(body.company);
    const role = getStringField(body.role);
    const useCase = getStringField(body.useCase);
    const budgetRange = getStringField(body.budgetRange);
    const notes = getStringField(body.notes);

    if (!name || !email || !company || !role || !useCase || !notes) {
      return NextResponse.json(
        {
          error:
            "Name, email, company, role, use case, and planning notes are required.",
        },
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
    const escapedCompany = escapeHtml(company);
    const escapedRole = escapeHtml(role);
    const escapedUseCase = escapeHtml(useCase);
    const escapedBudgetRange = budgetRange
      ? escapeHtml(budgetRange)
      : "Not provided";
    const escapedNotes = escapeHtml(notes).replace(/\n/g, "<br>");

    await sendPortfolioEmail({
      fromLabel: "Media Plan Template Request",
      toEnv: "MEDIA_PLAN_TO_EMAIL",
      subject: `Media plan template request from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Company / Brand: ${company}
Role: ${role}
Use Case: ${useCase}
Budget Range: ${budgetRange ?? "Not provided"}

Planning Notes:
${notes}

Next Step:
Review this request and manually share the Google Sheet if it is a fit.
      `,
      html: `
        <h2>New Media Plan Template Request</h2>
        <p><strong>Name:</strong> ${escapedName}</p>
        <p><strong>Email:</strong> ${escapedEmail}</p>
        <p><strong>Company / Brand:</strong> ${escapedCompany}</p>
        <p><strong>Role:</strong> ${escapedRole}</p>
        <p><strong>Use Case:</strong> ${escapedUseCase}</p>
        <p><strong>Budget Range:</strong> ${escapedBudgetRange}</p>
        <p><strong>Planning Notes:</strong></p>
        <p>${escapedNotes}</p>
        <hr />
        <p><strong>Next Step:</strong> Review this lead and manually share the Google Sheet if it is a fit.</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ ERROR sending media plan request:", error);

    if (error instanceof MailConfigError) {
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? getMailSetupHelpMessage()
              : "Request form is temporarily unavailable. Please try again later.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send media plan request" },
      { status: 500 }
    );
  }
}
