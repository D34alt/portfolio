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

function line(
  type: TerminalLine["type"],
  content: string,
  href?: string,
  copyText?: string
): TerminalLine {
  return { id: `line-${lineCounter++}-${Date.now()}`, type, content, href, copyText };
}

function blank(): TerminalLine {
  return line("output", "");
}

function asciiHeader(art: string[], label: string): TerminalLine[] {
  return [
    blank(),
    line("header", `[ ${label} ]`),
    ...art.map((row) => line("ascii", row)),
    blank(),
  ];
}

import { asciiArt as art } from "./asciiArt";

// ──────────────────────────────────────────────────
// Command registry
// ──────────────────────────────────────────────────

interface CommandDefinition {
  description: string;
  mobileDescription?: string;
  handler: (args: string[], history: string[]) => TerminalLine[];
}

const commandRegistry: Record<string, CommandDefinition> = {
  help: {
    description: "List all available commands",
    handler: () => {
      const lines = [...asciiHeader(art.help, "Help")];
      for (const [name, cmd] of Object.entries(commandRegistry)) {
        lines.push(line("output", `  ${name}`));
        if (cmd.mobileDescription) {
          const desktop = line("system", `    ${cmd.description}`);
          desktop.visibility = "desktop";
          lines.push(desktop);
          const mobile = line("system", `    ${cmd.mobileDescription}`);
          mobile.visibility = "mobile";
          lines.push(mobile);
        } else {
          lines.push(line("system", `    ${cmd.description}`));
        }
      }
      lines.push(blank());
      const desktopTip = line("tip", "  Tip: use Tab for auto-complete, arrows for history.");
      desktopTip.visibility = "desktop";
      lines.push(desktopTip);
      const mobileTip = line("tip", "  Tip: press Space to auto-complete commands.");
      mobileTip.visibility = "mobile";
      lines.push(mobileTip);
      lines.push(blank());
      return lines;
    },
  },

  about: {
    description: "Learn about me",
    handler: () => [
      ...asciiHeader(art.about, "About"),
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
    description: "View my projects (use 'projects <number>' to open)",
    mobileDescription: "View my projects",
    handler: (args) => {
      // If an index argument is provided, open that project in a new tab.
      if (args.length > 0) {
        const idx = parseInt(args[0], 10);

        if (isNaN(idx) || idx < 0 || idx >= projects.length) {
          return [
            line("error", `  Invalid project index: ${args[0]}`),
            line(
              "system",
              `  Valid range: 0 - ${projects.length - 1}`
            ),
          ];
        }

        const project = projects[idx];

        if (!project.link) {
          return [line("error", `  No link available for '${project.name}'.`)];
        }

        window.open(project.link, "_blank", "noopener,noreferrer");
        return [
          line(
            "system",
            `  Opening ${project.name} in a new tab ...`
          ),
        ];
      }

      // No argument -- list all projects.
      const lines = [...asciiHeader(art.projects, "Projects")];
      projects.forEach((project, i) => {
        lines.push(
          line("output", `  [${i}] ${project.name}`, project.link)
        );
        lines.push(line("system", `    ${project.description}`));
        lines.push(line("system", `    Tech: ${project.tech.join(", ")}`));
        lines.push(blank());
      });
      const desktopProjectsTip = line("tip", "  Tip: run 'projects <number>' to open a project.");
      desktopProjectsTip.visibility = "desktop";
      lines.push(desktopProjectsTip);
      const mobileProjectsTip = line("tip", "  Tip: tap a project name to open it.");
      mobileProjectsTip.visibility = "mobile";
      lines.push(mobileProjectsTip);
      lines.push(blank());
      return lines;
    },
  },

  skills: {
    description: "View my technical skills",
    handler: () => {
      const lines = [...asciiHeader(art.skills, "Skills")];
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
      ...asciiHeader(art.contact, "Contact"),
      line("system", `  Email    ${personalInfo.email}`, undefined, personalInfo.email),
      line("system", `  GitHub   ${personalInfo.github}`, personalInfo.github),
      line("system", `  LinkedIn ${personalInfo.linkedin}`, personalInfo.linkedin),
      blank(),
      (() => { const t = line("tip", "  Tip: tap a link to open it."); t.visibility = "mobile"; return t; })(),
      blank(),
    ],
  },

  education: {
    description: "View my education",
    handler: () => {
      const lines = [...asciiHeader(art.education, "Education")];
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
      const lines = [...asciiHeader(art.experience, "Experience")];
      experience.forEach((entry) => {
        lines.push(line("output", `  ${entry.role} @ ${entry.company}`));
        lines.push(line("system", `  ${entry.period}`));
        entry.description.forEach((point) => {
          lines.push(line("system", `  - ${point}`));
        });
        lines.push(blank());
      });
      return lines;
    },
  },

  certifications: {
    description: "View my certifications",
    handler: () => {
      const lines = [...asciiHeader(art.certs, "Certifications")];
      certifications.forEach((cert) => {
        lines.push(line("output", `  ${cert.name}`, cert.link));
        lines.push(line("system", `    ${cert.issuer} | ${cert.issued}`));
        lines.push(blank());
      });
      const mobileCertsTip = line("tip", "  Tip: tap a certification to open it.");
      mobileCertsTip.visibility = "mobile";
      lines.push(mobileCertsTip);
      lines.push(blank());
      return lines;
    },
  },

  dachshund: {
    description: "????",
    handler: () => {
      const header = asciiHeader(art.dachshund, "Dachshund");
      // Show the dachshund art on mobile too -- it fits!
      header.forEach((l) => {
        if (l.type === "ascii") l.visibility = "all";
      });
      return [
        ...header,
        line("system", "  A good boy appeared! Long boi energy."),
        blank(),
      ];
    },
  },

  clear: {
    description: "Clear the terminal",
    handler: () => [],
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
