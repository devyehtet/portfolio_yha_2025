// lib/meta.ts
export function getCookie(name: string) {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match?.[2];
}

export function getFbp() {
  return getCookie("_fbp");
}

export function getFbc() {
  // If Meta click id (fbclid) exists in URL, create _fbc style value
  if (typeof window === "undefined") return getCookie("_fbc");

  const url = new URL(window.location.href);
  const fbclid = url.searchParams.get("fbclid");
  if (!fbclid) return getCookie("_fbc");

  // Meta format example: fb.1.<timestamp>.<fbclid>
  const ts = Math.floor(Date.now() / 1000);
  return `fb.1.${ts}.${fbclid}`;
}

export function newEventId() {
  // browser-safe event id
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    // @ts-ignore
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
