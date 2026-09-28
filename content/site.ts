export const site = {
  name: "Joshua",
  description:
    "I'm a junior software and web developer. I build sites and interfaces, and I'm working toward full stack and apps.",
  about: {
    lead: "I'm Joshua, a freelance designer and developer specializing in brand identity and website design and development.",
    body: "I handle both design and development, which keeps the final product faithful to the original vision. My work is grounded in clear layouts, intuitive navigation, and careful attention to detail.",
    highlights: [
      {
        label: "Brand Identity",
        title: "Cohesive visual systems",
        text: "Logo design, color, and typography developed as a unified system, so your brand stays consistent across your website and every other touchpoint.",
      },
      {
        label: "Website Design & Development",
        title: "Responsive, well-built websites",
        text: "From initial layout to launch, I build sites that perform reliably and read clearly on every screen size.",
      },
      {
        label: "User Experience",
        title: "Interfaces that are easy to use",
        text: "Navigation, empty states, and small interactions are designed so users can complete tasks without confusion.",
      },
      {
        label: "Technical Focus",
        title: "Front end expertise, expanding to full stack",
        text: "My core strength is front-end development. I am extending my work into APIs, databases, and server-side logic to deliver more of each project end to end.",
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
