// app/api/meta/capi/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { headers } from "next/headers";

export const runtime = "nodejs";

function sha256(str: string) {
  return crypto.createHash("sha256").update(str).digest("hex");
}

type MetaCapiRequestBody = {
  custom_data?: Record<string, unknown>;
  email?: string;
  event_id?: string;
  event_name?: string;
  fbc?: string;
  fbp?: string;
  phone?: string;
  url?: string;
};

type MetaCapiPayload = {
  data: Array<{
    action_source: string;
    custom_data?: Record<string, unknown>;
    event_id?: string;
    event_name: string;
    event_source_url?: string;
    event_time: number;
    user_data: {
      client_ip_address?: string;
      client_user_agent?: string;
      em?: string[];
      fbc?: string;
      fbp?: string;
      ph?: string[];
    };
  }>;
  test_event_code?: string;
};

export async function POST(req: Request) {
  try {
    const PIXEL_ID = process.env.META_PIXEL_ID;
    const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;
    const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

    if (!PIXEL_ID || !ACCESS_TOKEN) {
      return NextResponse.json(
        { ok: false, error: "Missing META_PIXEL_ID or META_CAPI_TOKEN in .env.local" },
        { status: 500 }
      );
    }

    const h = await headers();

    // Try to detect IP from headers (works on Vercel / proxies)
    const xff = h.get("x-forwarded-for");
    const ip = xff ? xff.split(",")[0].trim() : undefined;

    const userAgent = h.get("user-agent") ?? undefined;

    const body = (await req.json()) as MetaCapiRequestBody;

    const event_name: string = body.event_name || "PageView";
    const event_id: string | undefined = body.event_id;
    const event_source_url: string | undefined = body.url;

    const email: string | undefined = body.email?.toLowerCase().trim();
    const phone: string | undefined = body.phone?.replace(/\s+/g, "");

    const fbp: string | undefined = body.fbp;
    const fbc: string | undefined = body.fbc;

    const user_data: MetaCapiPayload["data"][number]["user_data"] = {
      client_user_agent: userAgent,
      client_ip_address: ip,
    };

    // Hash PII only if provided
    if (email) user_data.em = [sha256(email)];
    if (phone) user_data.ph = [sha256(phone)];

    // Add browser IDs if available
    if (fbp) user_data.fbp = fbp;
    if (fbc) user_data.fbc = fbc;

    const payload: MetaCapiPayload = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url,
          event_id,
          user_data,
          custom_data: body.custom_data || undefined,
        },
      ],
    };

    // Only send test_event_code if it's set
    if (TEST_EVENT_CODE) payload.test_event_code = TEST_EVENT_CODE;

    const res = await fetch(
      `https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = (await res.json()) as unknown;

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Meta API error", meta: result },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, meta: result });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected Meta CAPI error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
