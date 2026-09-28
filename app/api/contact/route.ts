import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isLettersOnly(name: string): boolean {
  return /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name);
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

  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  const fields: Partial<Record<"name" | "email" | "message", string>> = {};
  const missing: Array<"name" | "email" | "message"> = [];

  if (!name) missing.push("name");
  if (!email) missing.push("email");
  if (!message) missing.push("message");

  if (missing.length > 1) {
    for (const field of missing) {
      fields[field] = "One or more fields are missing";
    }
  } else if (missing[0] === "name") {
    fields.name = "Name is required";
  } else if (missing[0] === "email") {
    fields.email = "Email is required";
  } else if (missing[0] === "message") {
    fields.message = "Message is required";
  }

  if (name && !isLettersOnly(name))
    fields.name = "Name can only contain letters";
  else if (name.length > 120)
    fields.name = "Name must be less than 120 characters";

  if (email && (!isValidEmail(email) || email.length > 254))
    fields.email = "Enter a valid email address";

  if (message && message.length < 10)
    fields.message = "Message must be at least 10 characters";
  else if (message.length > 5000)
    fields.message = "Message must be less than 5000 characters";

  if (Object.keys(fields).length > 0) {
    return NextResponse.json({ fields }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: `Portfolio Contact <${from}>`,
    to: [to],
    replyTo: email,
    subject: `New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    console.error("Resent error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
