export default function Home() {
  return (
    <main className="flex-1 flex flex-col justify-center px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-sm font-medium text-accent-bright">Portfolio</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Hi, I'm <span className="text-primary">Joshua</span></h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          I'm a software engineer with a passion for building web applications that are fast, responsive, and easy to use.
        </p>
        <div className="mt-10 flex items-center gap-x-6">
          <a
            href="/projects"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-bright"
          >
            View projects
          </a>
          <a
            href="/contact"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-bright"
          >
            Contact
          </a>
        </div>
      </div>
    </main>
  );
}