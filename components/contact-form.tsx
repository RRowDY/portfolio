"use client";

import { useState, type SyntheticEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
    const [status, setStatus] = useState<Status>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function onSubmit(event: SyntheticEvent) {
        event.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        // Honeypot protection
        if (formData.get("company")) {
            setStatus("success");
            form.reset();
            return;
        }

        const payload = {
            name: String(formData.get("name") ?? "").trim(),
            email: String(formData.get("email") ?? "").trim(),
            message: String(formData.get("message") ?? "").trim(),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = (await res.json()) as { error?: string };

            if (!res.ok) {
                setStatus("error");
                setErrorMessage(data.error ?? "Something went wrong. Please try again.");
                return;
            }

            setStatus("success");
            form.reset();
            return;
        } catch (error) {
            setStatus("error");
            setErrorMessage("Network error. Please try again.");
        }
    }

    const inputClass = "w-full rounded-lg border border-border bg-elevated/50 px-4 py-2.5 text-foreground placeholder:text-subtle outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent/60 focus:ring-2 focus:ring-accent/20 disabled:opacity-60";

    return (
        <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
            {/* Honeypot protection */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="company" className="sr-only">Company</label>
                <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-muted">Name</label>
                <input type="text" id="name" name="name" required autoComplete="name" disabled={status === "loading"} className={inputClass} placeholder="Your name" />
            </div>

            <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-muted">Email</label>
                <input type="email" id="email" name="email" required autoComplete="email" disabled={status === "loading"} className={inputClass} placeholder="your@email.com" />
            </div>

            <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-muted">Message</label>
                <textarea id="message" name="message" required rows={5} disabled={status === "loading"} className={`${inputClass} resize-y min-h-[120px]`} placeholder="Your message" />
            </div>

            <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-70"
            >
                {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
                <p
                    role="status"
                    className="rounded-lg border border-accent/30 bg-elevated/80 px-4 py-3 text-sm text-accent-bright"
                >
                    Thanks! Your message was sent. I&apos;ll get back to you as soon as possible.
                </p>
            )}

            {status === "error" && (
                <p
                    role="alert"
                    className="rounded-lg border border-red-500/30 bg-elevated/80 px-4 py-3 text-sm text-red-400"
                >
                    {errorMessage}
                </p>
            )}
        </form>
    )
}