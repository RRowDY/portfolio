import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/content/site";

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto w-full max-w-2xl">
        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title="Get in touch"
          intro="Send a message and I'll reply via email."
        />

        {site.socialLinks.length > 0 ? (
          <p className="mt-4 text-center text-sm text-muted">
            Also on{" "}
            {site.socialLinks.map((link, index) => {
              const last = index === site.socialLinks.length - 1;
              const separator = index === 0 ? null : last ? " and " : ", ";

              return (
                <span key={link.id}>
                  {separator}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent-bright"
                  >
                    {link.label}
                  </a>
                </span>
              );
            })}
            .
          </p>
        ) : null}

        <div className="mt-12 rounded-2xl border border-border bg-elevated p-6 text-left sm:p-8">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
