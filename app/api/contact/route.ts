import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  contactEmailHtml,
  contactFieldErrors,
  createRateLimiter,
  isHoneypotFilled,
} from "@/lib/contact";

const isOverContactLimit = createRateLimiter(5, 10 * 60 * 1000);

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

function clientAddress(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  if (first) return first;

  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!to || !from || !apiKey) {
    return NextResponse.json(
      { error: "Server is not configured correctly" },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  if (isHoneypotFilled(body.company)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const fields = contactFieldErrors({ name, email, message });

  if (Object.keys(fields).length > 0) {
    return NextResponse.json({ fields }, { status: 400 });
  }

  if (isOverContactLimit(clientAddress(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const { error } = await resend.emails.send({
    from: `Portfolio Contact <${from}>`,
    to: [to],
    replyTo: email,
    subject: `New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: contactEmailHtml(name, email, message),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
