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

interface CommandDefinition {
  description: string;
  usage?: string;
  handler: (args: string[], history: string[]) => TerminalLine[];
}

const commandRegistry: Record<string, CommandDefinition> = {
  help: {
    description: "List all available commands",
    handler: () => {
      const lines = [blank(), line("output", "  Available commands:"), blank()];
      for (const [name, cmd] of Object.entries(commandRegistry)) {
        lines.push(
          line("output", `    ${name.padEnd(14)} ${cmd.description}`)
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
    handler: () => {
      const lines = [
        blank(),
        line("output", `  ${personalInfo.name}`),
        line(
          "system",
          `  ${personalInfo.title} | ${personalInfo.location}`
        ),
        blank(),
      ];
      personalInfo.bio.forEach((para) => {
        lines.push(line("output", `  ${para}`));
      });
      lines.push(blank());
      return lines;
    },
  },

  projects: {
    description: "View my projects",
    handler: () => {
      const lines = [blank()];
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
      const lines = [blank()];
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
      blank(),
      line("output", "  Contact:"),
      blank(),
      line("system", `    Email      ${personalInfo.email}`),
      line("system", `    GitHub     ${personalInfo.github}`),
      line("system", `    LinkedIn   ${personalInfo.linkedin}`),
      blank(),
    ],
  },

  education: {
    description: "View my education",
    handler: () => {
      const lines = [blank()];
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
      const lines = [blank()];
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
      const lines = [blank()];
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

  echo: {
    description: "Echo text back",
    usage: "echo <text>",
    handler: (args) => [line("output", `  ${args.join(" ")}`)],
  },

  whoami: {
    description: "Display current user",
    handler: () => [line("output", "  visitor")],
  },

  date: {
    description: "Display current date and time",
    handler: () => [line("output", `  ${new Date().toLocaleString()}`)],
  },

  history: {
    description: "Show command history",
    handler: (_args, commandHistory) => {
      if (commandHistory.length === 0) {
        return [line("system", "  No commands in history.")];
      }
      const lines = [blank()];
      commandHistory.forEach((cmd, i) => {
        lines.push(
          line("output", `  ${String(i + 1).padStart(4)}  ${cmd}`)
        );
      });
      lines.push(blank());
      return lines;
    },
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
