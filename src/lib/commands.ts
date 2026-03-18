import { TerminalLine } from "./types";
import {
  personalInfo,
  projects,
  skills,
  education,
  experience,
  certifications,
} from "./data";

let lineCounter = 0;

function line(type: TerminalLine["type"], content: string): TerminalLine {
  return { id: `line-${lineCounter++}-${Date.now()}`, type, content };
}

function blank(): TerminalLine {
  return line("output", "");
}

function asciiHeader(art: string[]): TerminalLine[] {
  return [blank(), ...art.map((row) => line("ascii", row)), blank()];
}

import { asciiArt as art } from "./asciiArt";

// ──────────────────────────────────────────────────
// Command registry
// ──────────────────────────────────────────────────

interface CommandDefinition {
  description: string;
  handler: (args: string[], history: string[]) => TerminalLine[];
}

const commandRegistry: Record<string, CommandDefinition> = {
  help: {
    description: "List all available commands",
    handler: () => {
      const lines = [...asciiHeader(art.help)];
      for (const [name, cmd] of Object.entries(commandRegistry)) {
        lines.push(
          line("output", `    ${name.padEnd(18)} ${cmd.description}`)
        );
      }
      lines.push(blank());
      lines.push(
        line(
          "system",
          "  Tip: use Tab for auto-completion and arrow keys for history."
        )
      );
      lines.push(blank());
      return lines;
    },
  },

  about: {
    description: "Learn about me",
    handler: () => [
      ...asciiHeader(art.about),
      line("output", `  ${personalInfo.name}`),
      line(
        "system",
        `  ${personalInfo.title} | ${personalInfo.location}`
      ),
      blank(),
      ...personalInfo.bio.map((para) => line("output", `  ${para}`)),
      blank(),
    ],
  },

  projects: {
    description: "View my projects",
    handler: () => {
      const lines = [...asciiHeader(art.projects)];
      projects.forEach((project, i) => {
        lines.push(line("output", `  [${i}] ${project.name}`));
        lines.push(line("system", `      ${project.description}`));
        lines.push(line("system", `      Tech: ${project.tech.join(", ")}`));
        if (project.link) {
          lines.push(line("system", `      ${project.link}`));
        }
        lines.push(blank());
      });
      return lines;
    },
  },

  skills: {
    description: "View my technical skills",
    handler: () => {
      const lines = [...asciiHeader(art.skills)];
      for (const [category, items] of Object.entries(skills)) {
        lines.push(line("output", `  ${category}`));
        lines.push(line("system", `    ${items.join(", ")}`));
        lines.push(blank());
      }
      return lines;
    },
  },

  contact: {
    description: "Get my contact information",
    handler: () => [
      ...asciiHeader(art.contact),
      line("system", `    Email      ${personalInfo.email}`),
      line("system", `    GitHub     ${personalInfo.github}`),
      line("system", `    LinkedIn   ${personalInfo.linkedin}`),
      blank(),
    ],
  },

  education: {
    description: "View my education",
    handler: () => {
      const lines = [...asciiHeader(art.education)];
      education.forEach((entry) => {
        lines.push(line("output", `  ${entry.degree}`));
        lines.push(
          line("system", `    ${entry.institution} | ${entry.period}`)
        );
        lines.push(blank());
      });
      return lines;
    },
  },

  experience: {
    description: "View my work experience",
    handler: () => {
      const lines = [...asciiHeader(art.experience)];
      experience.forEach((entry) => {
        lines.push(line("output", `  ${entry.role} @ ${entry.company}`));
        lines.push(line("system", `    ${entry.period}`));
        lines.push(line("system", `    ${entry.description}`));
        lines.push(blank());
      });
      return lines;
    },
  },

  certifications: {
    description: "View my certifications",
    handler: () => {
      const lines = [...asciiHeader(art.certs)];
      certifications.forEach((cert) => {
        lines.push(line("output", `  ${cert.name}`));
        lines.push(line("system", `    ${cert.issuer} | ${cert.issued}`));
        lines.push(blank());
      });
      return lines;
    },
  },

  clear: {
    description: "Clear the terminal",
    handler: () => [],
  },

  date: {
    description: "Display current date and time",
    handler: () => [
      ...asciiHeader(art.date),
      line("output", `  ${new Date().toLocaleString()}`),
      blank(),
    ],
  },
};

/**
 * Execute a command string and return the output lines.
 * Returns isClear = true when the user runs 'clear'.
 */
export function executeCommand(
  input: string,
  commandHistory: string[]
): { lines: TerminalLine[]; isClear: boolean } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { lines: [], isClear: false };
  }

  const [commandName, ...args] = trimmed.split(/\s+/);
  const command = commandRegistry[commandName.toLowerCase()];

  if (!command) {
    return {
      lines: [
        line("error", `  Command not found: ${commandName}`),
        line("system", "  Type 'help' to see available commands."),
      ],
      isClear: false,
    };
  }

  if (commandName.toLowerCase() === "clear") {
    return { lines: [], isClear: true };
  }

  return { lines: command.handler(args, commandHistory), isClear: false };
}

/** Returns all registered command names (used for auto-completion). */
export function getCommandNames(): string[] {
  return Object.keys(commandRegistry);
}
