# Danny Nguyen -- Terminal Portfolio

A minimalistic, modern developer portfolio styled as an interactive terminal.
Navigate the site by typing commands, just like a real shell.

## Features

- Full-screen terminal UI with a macOS-style title bar
- Dark slate colour scheme with JetBrains Mono font
- Coloured prompt (`visitor@danny:~$`) with a blinking cursor
- Command history (arrow keys) and tab auto-completion
- ASCII art welcome banner

## Available Commands

| Command | Description |
|---|---|
| `help` | List all available commands |
| `about` | Learn about me |
| `projects` | View my projects |
| `skills` | View my technical skills |
| `contact` | Get my contact information |
| `education` | View my education |
| `experience` | View my work experience |
| `certifications` | View my certifications |
| `clear` | Clear the terminal |
| `date` | Display current date and time |

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Customisation

All personal data lives in `src/lib/data.ts`. Edit that file to update your
bio, projects, skills, experience, education, and certifications.

## Deployment

The easiest way to deploy is via [Vercel](https://vercel.com):

```bash
npm run build
```

## Licence

MIT
