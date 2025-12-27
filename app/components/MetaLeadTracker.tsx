"use client";

import { getFbp, getFbc, newEventId } from "@/lib/meta";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export async function sendLeadEvent(params: {
  email?: string;
  phone?: string;
  url?: string;
}) {
  const eventId = newEventId();

  // 1) Browser Pixel event
  if (window.fbq) {
    window.fbq("track", "Lead", {}, { eventID: eventId });
  }

  // 2) Server CAPI event (same event_id => dedup)
  await fetch("/api/meta/capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_name: "Lead",
      event_id: eventId,
      email: params.email,
      phone: params.phone,
      url: params.url || window.location.href,
      fbp: getFbp(),
      fbc: getFbc(),
      custom_data: {
        content_name: "Contact Form",
      },
    }),
  });

  return eventId;
}
