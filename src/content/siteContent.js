// Official sites of every organisation mentioned on the page.
// Linked wherever the name appears (and in the JSON-LD in public/index.html).
export const orgLinks = {
  ventureag: "https://www.venture.ag/",
  uottawa: "https://www.uottawa.ca/en",
  mdti: "https://catalogue.uottawa.ca/en/graduate/master-digital-transformation-innovation/",
  nsu: "https://www.northsouth.edu/",
  pumpkinplus: "https://pumpkinplus.com/",
  mastermind: "https://mastermind.edu.bd/",
  acmPaper: "https://doi.org/10.1145/3690771.3690777",
};

const siteContent = {
  profile: {
    name: "Chowdhury Nafis Faiyaz",
    firstName: "Nafis",
    lastName: "Faiyaz",
    title: "Software Engineer & Co-founder",
    email: "nafisfaiyaz47@gmail.com",
  },
  documents: {
    resume: `${process.env.PUBLIC_URL}/Documents/Chowdhury-Nafis-Faiyaz-Resume.pdf`,
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/nafis-faiyaz193/",
    github: "https://github.com/nafisfaiyaz007",
    facebook: "https://www.facebook.com/nafisfaiyazz",
  },
  navbar: {
    tagline: "Nafis Faiyaz",
    status: "Dhaka → Ottawa",
    statusPill: "Building Venture.ag",
    // centred links on large screens (the full list lives in the menu)
    desktop: [
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Work" },
      { label: "Résumé", href: `${process.env.PUBLIC_URL}/Documents/Chowdhury-Nafis-Faiyaz-Resume.pdf` },
      { id: "contact", label: "Contact" },
    ],
    links: [
      { id: "top", label: "Home" },
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "education", label: "Education" },
      { id: "projects", label: "Work" },
      { id: "toolkit", label: "Toolkit" },
      { id: "art", label: "Art" },
      { id: "contact", label: "Contact" },
    ],
  },
  hero: {
    role: "Software Engineer & Co-founder",
    status: "Building Venture.ag · MDTI uOttawa",
  },
  about: {
    label: "Introduction",
    facts: [
      { k: "Based in", v: "Dhaka · Ottawa" },
      { k: "Currently", v: "Venture.ag", href: orgLinks.ventureag },
      { k: "Studying", v: "MDTI, uOttawa", href: orgLinks.mdti },
      { k: "Stack", v: "React · Next.js · Python" },
    ],
    // Strings are plain text; { t, href } segments become links.
    statement: [
      "I turn hard, physical-world problems into clean, intelligent software — right now that means putting ",
      { t: "agricultural robotics", href: orgLinks.ventureag },
      " one search away for every farmer.",
    ],
    biography: [
      [
        "I’m a software engineer and the Co-founder & Lead Technical Consultant at ",
        { t: "Venture.ag", href: orgLinks.ventureag },
        ", where I architect an AI-powered marketplace for autonomous agriculture — geospatial matching on Google Maps, AI-assisted site analysis and a Next.js platform, taken from first commit to MVP and into a seed round.",
      ],
      [
        "From January 2027 I’m in the ",
        { t: "Master of Digital Transformation and Innovation (MDTI)", href: orgLinks.mdti },
        " at the ",
        { t: "University of Ottawa", href: orgLinks.uottawa },
        ", sharpening the strategy behind shipping technology. Before that: a cum laude CSE degree from ",
        { t: "North South University", href: orgLinks.nsu },
        ", an ",
        { t: "ACM-published ML paper", href: orgLinks.acmPaper },
        ", and four years building the web for ",
        { t: "Pumpkin Plus", href: orgLinks.pumpkinplus },
        ".",
      ],
    ],
    primaryCta: "Read the résumé",
    secondaryCta: "LinkedIn",
    contactCta: "Get in touch",
  },
  experience: {
    label: "Experience",
    heading: ["Building since 2021,", "now from zero to one."],
  },
  education: {
    label: "Education",
    heading: ["Always", "learning."],
  },
  projects: {
    label: "Selected work",
    heading: ["Work, built", "to be used."],
    allLabel: "All projects",
    allHref: "https://github.com/nafisfaiyaz007",
    cta: "View case",
  },
  toolkit: {
    label: "Toolkit",
    heading: ["What I bring", "to the table."],
    lead: "Drag the wheel, or just scroll — it listens to both. Every discipline I work in, roughly in the order teams ask for them.",
    areas: [
      "Full-stack Web",
      "Product Architecture",
      "Machine Learning",
      "Geospatial Systems",
      "AI Workflows",
      "Databases & SQL",
      "UI & UX Design",
      "Data Analysis",
    ],
    tools: ["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "Google Maps API", "Tailwind"],
  },
  painting: {
    label: "Art",
    heading: ["Off the screen,", "on the canvas."],
    lead: "My eye for minimal design started with painting — simple forms, quiet colour, a lot left unsaid.",
  },
  contact: {
    signoff: "Thanks for scrolling this far — Dhaka, 2026",
    marquee: [
      { t: "Open to collaboration", serif: false },
      { t: "Product engineering", serif: true },
      { t: "AI · Web · Agri-tech", serif: false },
      { t: "Dhaka + Ottawa", serif: true },
      { t: "Remote friendly", serif: false },
    ],
    label: "Next step",
    heading: ["Let’s build something", "that matters."],
  },
  footer: {
    rightsPrefix: "Chowdhury Nafis Faiyaz. All rights reserved.",
    motionNote: "Motion respects “reduce motion”",
    basedIn: ["Dhaka, Bangladesh", "Ottawa, Canada", "Remote — worldwide"],
  },
};

export default siteContent;
