const pumpkinplus =
  "https://res.cloudinary.com/dq8h4hhir/image/upload/v1736868010/Portfolio%20Pictures/PumpkinPlus_website_fddd6g.png";
const alcohol =
  "https://res.cloudinary.com/dq8h4hhir/image/upload/v1736868008/Portfolio%20Pictures/alcohol_ecxi06.webp";
const MedEase =
  "https://res.cloudinary.com/dq8h4hhir/image/upload/v1736868008/Portfolio%20Pictures/medease_o6avr5.jpg";
const nsucanteen =
  "https://res.cloudinary.com/dq8h4hhir/image/upload/v1736868008/Portfolio%20Pictures/NSU_canteen_i8hqdm.jpg";

const projectData = [
  {
    id: 1,
    title: "MedEase",
    category: "Blockchain · Health",
    year: "2024",
    description:
      "Capstone project: a blockchain-based electronic health record system using IPFS and a private chain, so patients, doctors and hospitals can share medical data securely and tamper-proof.",
    image: MedEase,
    link: "https://github.com/NafisFaiyaz007/MedEase_CSE499_SeniorDesign",
  },
  {
    id: 2,
    title: "Risky Drinking, Explained",
    category: "ML research · ACM",
    year: "2024",
    description:
      "An interpretable machine learning system that predicts risky alcohol consumption among students from behavioural and family factors — 80.9% test accuracy with XAI-driven factor attribution. Published with ACM (ACMLC 2024).",
    image: alcohol,
    link: "https://doi.org/10.1145/3690771.3690777",
  },
  {
    id: 3,
    title: "Pumpkin Plus",
    category: "Brand + Web",
    year: "2021",
    description:
      "The company website for an agri-innovation startup: fast, on-brand and built to scale with the business.",
    image: pumpkinplus,
    link: "https://pumpkinplus.com/",
  },
  {
    id: 4,
    title: "NSU Canteen",
    category: "Full-stack · Payments",
    description:
      "An online ordering and queue system for the university canteen: order, pay online, and pick up at the counter. Built with HTML, Tailwind CSS, JavaScript, PHP and a payment gateway API.",
    image: nsucanteen,
    link: "https://github.com/zahirulnahid/CSE-482-Online-Canteen-Order-and-Queue-System",
  },
];

export default projectData;
