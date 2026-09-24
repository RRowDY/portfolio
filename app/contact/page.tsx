import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
    return (
      <main className="flex flex-1 flex-col px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-3xl">
          <p className="text-sm font-medium text-accent-bright">Get in touch with me</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Contact</h1>
          <p className="mt-4 max-w-xl text-muted">Send a message and I&apos;ll reply via email.</p>
          <ContactForm />
        </div>
      </main>
    );
  }