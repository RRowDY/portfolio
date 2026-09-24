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
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid request body" },
            { status: 400 },
        );
    }

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || name.length > 120) {
        return NextResponse.json({ error: "Name is required and must be less than 120 characters" }, { status: 400 });
    }

    if (!email || !isValidEmail(email) || email.length > 254) {
        return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (!message || message.length > 5000 || message.length < 10) {
        return NextResponse.json({ error: "Message is required and must be between 10 and 5000 characters" }, { status: 400 });
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
        return NextResponse.json({ error: "Failed to send email. Please try again later." }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
}