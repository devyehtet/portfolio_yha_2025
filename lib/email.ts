import nodemailer from "nodemailer";

export class MailConfigError extends Error {
  constructor(message = "Missing email provider configuration.") {
    super(message);
    this.name = "MailConfigError";
  }
}

type MailConfigOptions = {
  defaultFromLabel?: string;
  defaultToEnv?: string;
};

type MailInput = {
  html: string;
  replyTo: string;
  subject: string;
  text: string;
  toEnv?: string;
  fromLabel?: string;
};

export function getStringField(value: unknown) {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getResolvedRecipientEmail(options?: MailConfigOptions) {
  return (
    (options?.defaultToEnv ? process.env[options.defaultToEnv] : undefined) ??
    process.env.RESEND_TO_EMAIL ??
    process.env.CONTACT_TO_EMAIL ??
    process.env.SMTP_USER ??
    null
  );
}

function formatFromAddress(fromEmail: string, fromLabel?: string) {
  if (fromEmail.includes("<")) {
    return fromEmail;
  }

  if (!fromLabel) {
    return fromEmail;
  }

  const safeLabel = fromLabel.replace(/"/g, "");
  return `"${safeLabel}" <${fromEmail}>`;
}

function getResendConfig(options?: MailConfigOptions) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = getResolvedRecipientEmail(options);
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ??
    process.env.CONTACT_FROM_EMAIL ??
    null;

  if (!apiKey || !toEmail || !fromEmail) {
    return null;
  }

  return {
    apiKey,
    fromAddress: formatFromAddress(
      fromEmail,
      options?.defaultFromLabel ?? "Portfolio Contact"
    ),
    toEmail,
  };
}

function getSmtpConfig(options?: MailConfigOptions) {
  const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT ?? "465");
  const smtpSecure =
    process.env.SMTP_SECURE === undefined
      ? smtpPort === 465
      : process.env.SMTP_SECURE === "true";
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = getResolvedRecipientEmail(options);
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ??
    process.env.CONTACT_FROM_EMAIL ??
    process.env.BOOKING_FROM_EMAIL ??
    smtpUser;

  if (
    !smtpUser ||
    !smtpPass ||
    !toEmail ||
    !fromEmail ||
    Number.isNaN(smtpPort)
  ) {
    throw new MailConfigError();
  }

  return {
    fromEmail,
    fromLabel: options?.defaultFromLabel ?? "Portfolio Contact",
    smtpHost,
    smtpPass,
    smtpPort,
    smtpSecure,
    smtpUser,
    toEmail,
  };
}

export function getMailSetupHelpMessage() {
  return "Server email is not configured yet. Set RESEND_API_KEY, RESEND_FROM_EMAIL, and MEDIA_PLAN_TO_EMAIL (or CONTACT_TO_EMAIL). SMTP vars still work as a fallback if you prefer them.";
}

async function sendViaResend(input: MailInput, options?: MailConfigOptions) {
  const config = getResendConfig(options);

  if (!config) {
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "yehtet-portfolio/1.0",
    },
    body: JSON.stringify({
      from: config.fromAddress,
      to: [config.toEmail],
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: input.replyTo,
    }),
  });

  if (!response.ok) {
    let message = `Resend API request failed with status ${response.status}.`;

    try {
      const data = (await response.json()) as {
        error?: { message?: string };
        message?: string;
      };

      message = data.error?.message ?? data.message ?? message;
    } catch {
      // ignore json parse errors
    }

    throw new Error(message);
  }

  return true;
}

async function sendViaSmtp(input: MailInput, options?: MailConfigOptions) {
  const config = getSmtpConfig(options);
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  await transporter.sendMail({
    from: formatFromAddress(config.fromEmail, config.fromLabel),
    to: config.toEmail,
    subject: input.subject,
    replyTo: input.replyTo,
    text: input.text,
    html: input.html,
  });
}

export async function sendPortfolioEmail(input: MailInput) {
  const options = {
    defaultFromLabel: input.fromLabel,
    defaultToEnv: input.toEnv,
  };

  const sentWithResend = await sendViaResend(input, options);
  if (sentWithResend) {
    return;
  }

  await sendViaSmtp(input, options);
}
