"use client";

import { useState, type FormEvent } from "react";
import { ArrowChip } from "@/components/arrow-chip";
import {
  contactFieldErrors,
  type ContactField,
  type ContactFieldErrors,
} from "@/lib/contact";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  function clearField(field: ContactField) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
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

    const problems = contactFieldErrors(payload);
    if (Object.keys(problems).length > 0) {
      setFieldErrors(problems);
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as {
        error?: string;
        fields?: ContactFieldErrors;
      };

      if (!res.ok) {
        if (data.fields) {
          setFieldErrors(data.fields);
          setStatus("idle");
          return;
        }
        setStatus("error");
        setErrorMessage(
          data.error ?? "Something went wrong. Please try again.",
        );
        return;
      }

      setStatus("success");
      setFieldErrors({});
      form.reset();
      return;
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  function controlClass(field: ContactField, extra = "") {
    const border = fieldErrors[field] ? "border-red-400/40" : "border-border";
    return [
      "w-full rounded-xl border bg-background/60 px-4 py-2.5 text-foreground placeholder:text-subtle outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent/60 focus:ring-2 focus:ring-accent/20 disabled:opacity-60",
      border,
      extra,
    ]
      .filter(Boolean)
      .join(" ");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Honeypot protection */}
      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="company" className="sr-only">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-muted"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          disabled={status === "loading"}
          className={controlClass("name")}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
          onChange={() => clearField("name")}
          placeholder="Your name"
        />
        {fieldErrors.name && (
          <p
            id="name-error"
            role="alert"
            className="field-hint mt-1.5 text-xs text-red-300/90"
          >
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-muted"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          disabled={status === "loading"}
          className={controlClass("email")}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
          onChange={() => clearField("email")}
          placeholder="your@email.com"
        />
        {fieldErrors.email && (
          <p
            id="email-error"
            role="alert"
            className="field-hint mt-1.5 text-xs text-red-300/90"
          >
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          disabled={status === "loading"}
          className={controlClass("message", "min-h-[120px] resize-y")}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          onChange={() => clearField("message")}
          placeholder="Your message"
        />
        {fieldErrors.message && (
          <p
            id="message-error"
            role="alert"
            className="field-hint mt-1.5 text-xs text-red-300/90"
          >
            {fieldErrors.message}
          </p>
        )}
      </div>

      <ArrowChip type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </ArrowChip>

      {status === "success" && (
        <p
          role="status"
          className="rounded-lg border border-accent/30 bg-elevated/80 px-4 py-3 text-sm text-accent-bright"
        >
          Thanks! Your message was sent. I&apos;ll get back to you as soon as
          possible.
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
  );
}
