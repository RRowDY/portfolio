import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Title = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={["text-center", className].filter(Boolean).join(" ")}>
      <p className="text-sm font-medium text-accent-bright">{eyebrow}</p>
      <Title
        id={id}
        className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
      >
        {title}
      </Title>
      {intro ? (
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
