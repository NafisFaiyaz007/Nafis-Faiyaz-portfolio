import { orgLinks } from "../../content/siteContent";

const experienceData = [
  {
    period: "Jul 2025 — Now",
    role: "Co-founder & Lead Technical Consultant",
    company: "Venture.ag",
    companyHref: orgLinks.ventureag,
    location: "San Francisco, USA · Remote",
    summary:
      "I co-founded Venture.ag and lead its technology: an AI-powered marketplace that matches farmers with the right agricultural robotics. I own the product architecture, system design and roadmap, and took the platform from concept to MVP.",
    points: [
      "Engineered a geospatial recommendation engine on the Google Maps API that matches farms to automation solutions, cutting manual site assessment.",
      "Built and shipped the React / Next.js front end for real-time, data-driven decision support.",
      "Designed AI-assisted workflows for automated site analysis and equipment matching.",
      "Shaped technical strategy and investor-facing material for the seed round.",
    ],
    tags: ["Next.js", "React", "Google Maps API", "AI workflows", "Product strategy"],
  },
  {
    period: "Apr 2021 — Dec 2024",
    role: "Web Designer & Developer",
    company: "Pumpkin Plus Agro Innovation",
    companyHref: orgLinks.pumpkinplus,
    location: "Dhaka, Bangladesh",
    summary:
      "Designed, built and maintained the company’s web presence, keeping it fast, on-brand and easy to grow.",
    points: [
      "Improved loading speed by 30% through performance work.",
      "Helped showcase the company’s work to funders, including USAID seed funding and a Food Planet Prize 2024 finalist place.",
    ],
    tags: ["Web design", "Front-end", "Performance"],
  },
  {
    period: "Mar 2022 — Jun 2022",
    role: "Baseline Survey Analyst",
    company: "Pumpkin Plus Agro Innovation",
    companyHref: orgLinks.pumpkinplus,
    location: "Dhaka, Bangladesh",
    summary:
      "Led the design, implementation and analysis of a baseline survey measuring the impact of agricultural innovation programmes, and defined the indicators for future evaluations.",
    points: [
      "Collected demographic data from rural beneficiaries and turned it into recommendations with agricultural experts.",
    ],
    tags: ["Survey design", "Data analysis", "Excel"],
  },
];

export default experienceData;
