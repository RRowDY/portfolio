export const site = {
  tab: "Joshua's Portfolio",
  name: "Joshua",
  description:
    "Software and web developer building sites and interfaces, with a path toward full-stack work.",
  footerTagline:
    "Software and web developer. I build sites and interfaces that stay clear as they grow.",
  featuredSlugs: ["project-1", "project-2"],
  about: {
    lead: "I'm Joshua, a software and web developer. I build sites and interfaces, and design is one of the skills I use to keep them clear.",
    body: "I handle layout and implementation together, so what ships stays close to the plan. The work is grounded in readable structure, straightforward navigation, and careful detail.",
    highlights: [
      {
        label: "Software & web",
        title: "Sites and interfaces",
        text: "I build websites and application interfaces that stay readable and reliable across screen sizes.",
      },
      {
        label: "Design sensibility",
        title: "Visual choices that support the product",
        text: "Color, type, and layout stay consistent so an interface is easy to scan. Design supports the software I build.",
      },
      {
        label: "User experience",
        title: "Interfaces that are easy to use",
        text: "Navigation, empty states, and small interactions are shaped so people can finish a task without confusion.",
      },
      {
        label: "Technical focus",
        title: "Front end first, expanding to full stack",
        text: "My core strength is front-end development. I am extending into APIs, databases, and server-side logic so more of each project can ship end to end.",
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
