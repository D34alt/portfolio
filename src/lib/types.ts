export type LineType = "input" | "output" | "error" | "ascii" | "header" | "tip" | "system";

export interface TerminalLine {
  id: string;
  type: LineType;
  content: string;
  href?: string;
  copyText?: string;
  /** Restrict this line to a specific viewport. */
  visibility?: "mobile" | "desktop" | "all";
}

export interface PortfolioProject {
  name: string;
  description: string;
  tech: string[];
  link?: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
}

export interface CertificationEntry {
  name: string;
  issuer: string;
  issued: string;
  link?: string;
}
