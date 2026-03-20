import {
  PortfolioProject,
  ExperienceEntry,
  EducationEntry,
  CertificationEntry,
} from "./types";

export const personalInfo = {
  name: "Danny Nguyen",
  handle: "danny",
  title: "Developer | Perpetual Tinkerer",
  location: "Melbourne, Australia",
  bio: [
    "Hey, I'm Danny. The kind of person who waited five minutes",
    "for a floppy-disk PC to boot just to play Pinball Space Cadet.",
    "",
    "I spent over four years as an Analyst Engineer at NAB, working",
    "with Python, AWS, and PostgreSQL in the banking space. These",
    "days I'm at MyConnect helping people sort out their home moves,",
    "but my heart's still very much in code.",
    "",
    "If I can learn the mainframe, I can learn just about anything,",
    "and I intend to prove it. Currently sharpening my Next.js",
    "skills and picking up Ruby.",
    "",
    "Past adventures include building a Minecraft AI mod, and an",
    "auto-scheduler that reads my partner's roster texts and drops",
    "shifts straight into her calendar (with pay calculations,",
    "because why not).",
    "",
    "When I'm not at a keyboard you'll find me at a piano, on a",
    "basketball court, or quietly losing at chess.",
  ],
  email: "d34ault@proton.me",
  github: "https://github.com/D34alt",
  linkedin: "https://www.linkedin.com/in/vdannynguyen/",
};

export const projects: PortfolioProject[] = [
  {
    name: "eml_to_pdf",
    description:
      "A utility for converting EML email files to PDF format.",
    tech: ["Python"],
    link: "https://github.com/D34alt/eml_to_pdf",
  },
  {
    name: "terminal-portfolio",
    description:
      "This very portfolio, a terminal-themed personal website built with Next.js.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS"],
    link: "https://github.com/D34alt/portfolio",
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
    company: "MyConnect",
    role: "Home Moving Specialist",
    period: "2025 - Present",
    description:
      "Helping customers navigate the chaos of moving house: connections, utilities, and everything in between.",
  },
  {
    company: "NAB (National Australia Bank)",
    role: "Analyst Engineer",
    period: "Mar 2021 - Sep 2025",
    description:
      "Leveraged Python, AWS, and PostgreSQL to deliver engineering solutions in the banking sector.",
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
    link: "https://skillshop.exceedlms.com/student/award/4Rqsd59XTKYNzoKVLp78AgXD",
  },
  {
    name: "IBM Z Xplore - Concepts",
    issuer: "IBM",
    issued: "Oct 2022",
    link: "https://www.credly.com/badges/c6411693-ed89-4189-b905-e6b6561c8977/linked_in_profile",
  },
  {
    name: "Master the Mainframe 2020 - Level 2",
    issuer: "IBM",
    issued: "Aug 2021",
    link: "https://www.credly.com/badges/26e75ce2-a4b8-43fe-8cc8-225f5e65e267?source=linked_in_profile",
  },
];
