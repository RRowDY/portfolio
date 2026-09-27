export const site = {
  name: "Joshua",
  description:
    "I'm a junior software and web developer. I build sites and interfaces, and I'm working toward full stack and apps.",
  about: {
    lead: "I'm a junior software and web developer, building for the web and working toward full stack and apps.",
    body: "I build sites and interfaces people can actually move through: clear layouts, responsive screens, and the small details that keep a flow from stalling. I'm learning the back end next to that — data, server logic, and how the two sides fit — so I can ship more than a page, including apps with a real job to do.",
    highlights: [
      {
        label: "Web",
        title: "Sites and interfaces",
        text: "I build pages and UI in the browser, from a first layout to something that loads, responds, and stays readable on different screens.",
      },
      {
        label: "Use",
        title: "Flows people can finish",
        text: "Navigation, empty states, and small interactions count. A feature is in good shape when someone can follow it without guessing.",
      },
      {
        label: "Stack",
        title: "Front end, then both sides",
        text: "I'm junior and strongest in the front end today. I'm growing into APIs, databases, and server logic so the same project can live on both sides.",
      },
      {
        label: "Apps",
        title: "Products people open",
        text: "The aim is full stack work and apps, not only a single page: the screen, the data behind it, and a job the product actually does.",
      },
    ],
  },
  nav: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  socialLinks: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/RRowDY",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/joshua-dev/",
    },
  ],
} as const;
