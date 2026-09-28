import type {
  ContactField,
  ContactFieldErrors,
  ContactPayload,
} from "./contact";

export type ContactField = "name" | "email" | "message";
export type ContactFieldErrors = Partial<Record<ContactField, string>>;
export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const NAME_PATTERN = /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function contactFieldErrors(
  payload: ContactPayload,
): ContactFieldErrors {
  const fields: ContactFieldErrors = {};

  if (!payload.name) fields.name = "Name is required";
  else if (!NAME_PATTERN.test(payload.name))
    fields.name = "Use letters, spaces, hyphens, or apostrophes";
  else if (payload.name.length > 120)
    fields.name = "Keep the name to 120 characters or less";

  if (!payload.email) fields.email = "Email is required";
  else if (!EMAIL_PATTERN.test(payload.email) || payload.email.length > 254)
    fields.email = "Enter a valid email address";

  if (!payload.message) fields.message = "Message is required";
  else if (payload.message.length < 10)
    fields.message = "Enter a message of at least 10 characters";
  else if (payload.message.length > 5000)
    fields.message = "Keep the message to 5000 characters or less";

  return fields;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function contactEmailHtml(
  name: string,
  email: string,
  message: string,
): string {
  return `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replaceAll("\n", "<br>")}</p>`;
}

export function isHoneypotFilled(company: unknown): boolean {
  return typeof company === "string" && company.trim().length > 0;
}

export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, number[]>();

  return function isOverLimit(key: string, now = Date.now()): boolean {
    const recent = (hits.get(key) ?? []).filter(
      (time) => now - time < windowMs,
    );
    recent.push(now);
    hits.set(key, recent);
    return recent.length > limit;
  };
}
