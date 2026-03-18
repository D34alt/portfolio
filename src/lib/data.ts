import {
  PortfolioProject,
  ExperienceEntry,
  EducationEntry,
  CertificationEntry,
} from "./types";

export const personalInfo = {
  name: "Danny Nguyen",
  handle: "danny",
  title: "Analyst Engineer",
  location: "Melbourne, Australia",
  bio: [
    "Analyst Engineer with over four years of experience at NAB,",
    "specialising in Python, AWS, and PostgreSQL.",
    "Passionate about web development, AI/ML, and open-source.",
    "Prefer hosting AI services locally with a beefy GPU setup.",
  ],
  email: "your.email@example.com",
  github: "https://github.com/d3f4lt",
  linkedin: "https://www.linkedin.com/in/vdannynguyen/",
};

export const projects: PortfolioProject[] = [
  {
    name: "eml_to_pdf",
    description:
      "A utility for converting EML email files to PDF format.",
    tech: ["Python"],
    link: "https://github.com/d3f4lt/eml_to_pdf",
  },
  {
    name: "terminal-portfolio",
    description:
      "This very portfolio -- a terminal-themed personal website built with Next.js.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS"],
    link: "https://github.com/d3f4lt/portfolio",
  },
];

export const skills: Record<string, string[]> = {
  Languages: ["Python", "TypeScript", "JavaScript", "SQL"],
  Cloud: ["AWS"],
  Databases: ["PostgreSQL"],
  Frontend: ["React", "Next.js", "Tailwind CSS"],
  Backend: ["Node.js", "Express"],
  Tools: ["Git", "Docker", "Linux"],
  Other: ["AI/ML", "REST APIs", "Digital Marketing"],
};

export const education: EducationEntry[] = [
  {
    institution: "RMIT University",
    degree: "Bachelor of Information Technology",
    period: "2019 - 2021",
  },
  {
    institution: "Coder Academy",
    degree: "Diploma of Information Technology",
    period: "2020 - 2021",
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: "NAB (National Australia Bank)",
    role: "Analyst Engineer",
    period: "Mar 2021 - Sep 2025",
    description:
      "Leveraging Python, AWS, and PostgreSQL to deliver engineering solutions in the banking sector.",
  },
  {
    company: "Officeworks",
    role: "Retail Assistant (Tech)",
    period: "Mar 2019 - Mar 2021",
    description:
      "Tech assistant, point of service, and print and copy specialist.",
  },
];

export const certifications: CertificationEntry[] = [
  {
    name: "Fundamentals of Digital Marketing",
    issuer: "Google Digital Garage",
    issued: "Jun 2023",
  },
  {
    name: "IBM Z Xplore - Concepts",
    issuer: "IBM",
    issued: "Oct 2022",
  },
  {
    name: "Master the Mainframe 2020 - Level 2",
    issuer: "IBM",
    issued: "Aug 2021",
  },
];
