// app/api/meta/capi/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { headers } from "next/headers";

export const runtime = "nodejs";

function sha256(str: string) {
  return crypto.createHash("sha256").update(str).digest("hex");
}

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

    const body = await req.json();

    const event_name: string = body.event_name || "PageView";
    const event_id: string | undefined = body.event_id;
    const event_source_url: string | undefined = body.url;

    const email: string | undefined = body.email?.toLowerCase().trim();
    const phone: string | undefined = body.phone?.replace(/\s+/g, "");

    const fbp: string | undefined = body.fbp;
    const fbc: string | undefined = body.fbc;

    const user_data: any = {
      client_user_agent: userAgent,
      client_ip_address: ip,
    };

    // Hash PII only if provided
    if (email) user_data.em = [sha256(email)];
    if (phone) user_data.ph = [sha256(phone)];

    // Add browser IDs if available
    if (fbp) user_data.fbp = fbp;
    if (fbc) user_data.fbc = fbc;

    const payload: any = {
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

    const result = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Meta API error", meta: result },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, meta: result });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
