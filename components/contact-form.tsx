"use client";

import { useState, type SyntheticEvent } from "react";
import { ArrowChip } from "@/components/arrow-chip";

type Status = "idle" | "loading" | "success" | "error";

type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

function problemsFor(payload: {
  name: string;
  email: string;
  message: string;
}): FieldErrors {
  const fields: FieldErrors = {};
  const missing: FieldName[] = [];

  if (!payload.name) missing.push("name");
  if (!payload.email) missing.push("email");
  if (!payload.message) missing.push("message");

  const requiredMessage: Record<FieldName, string> = {
    name: "Name is required",
    email: "Email is required",
    message: "Message is required",
  };
  for (const field of missing) {
    fields[field] = requiredMessage[field];
  }

  if (payload.name && !/^[A-Za-z]+(?:[A-Za-z]+)*$/.test(payload.name))
    fields.name = "Name can only contain letters";
  else if (payload.name.length > 120)
    fields.name = "Keep the name under 120 characters";
  if (
    payload.email &&
    (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) ||
      payload.email.length > 254)
  )
    fields.email = "Enter a valid email address";
  if (payload.message && payload.message.length < 10)
    fields.message = "Write at least 10 characters";
  else if (payload.message.length > 5000)
    fields.message = "Keep the message under 5000 characters";

  return fields;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function clearField(field: FieldName) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

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

    const problems = problemsFor(payload);
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
        fields?: FieldErrors;
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

  function controlClass(field: FieldName, extra = "") {
    const border = fieldErrors[field] ? "border-red-400/40" : "border-border";
    return [
      "w-full rounded-lg border bg-elevated/50 px-4 py-2.5 text-foreground placeholder:text-subtle outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent/60 focus:ring-2 focus:ring-accent/20 disabled:opacity-60",
      border,
      extra,
    ]
      .filter(Boolean)
      .join(" ");
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
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
          className={controlClass("message", "resize-y min-h-[120px]")}
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
