# Danny Nguyen -- Terminal Portfolio

A minimalistic, modern developer portfolio disguised as an interactive terminal.
Type commands to explore -- just like you would in a real shell.

## Features

- Full-screen terminal UI with a macOS-style traffic-light title bar
- Dark slate colour scheme using JetBrains Mono
- Coloured prompt (`visitor@danny:~$`) with a blinking cursor
- Command history via arrow keys and tab auto-completion
- Scramble-reveal text animation on command output
- ASCII art headers generated with Figlet (via `npm run generate:ascii`)
- Staggered line-by-line output rendering
- Responsive layout that works on mobile and desktop
- A hidden easter egg for the curious

## Available Commands

- `help` -- List all available commands
- `about` -- Learn about me
- `projects` -- View my projects
- `skills` -- View my technical skills
- `contact` -- Get my contact information
- `education` -- View my education
- `experience` -- View my work experience
- `certifications` -- View my certifications
- `clear` -- Clear the terminal

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript 5](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)

## Project Structure

```
src/
  app/            -- Next.js App Router (layout, page, global styles)
  components/     -- React components (Terminal, TitleBar, CommandInput, etc.)
  hooks/          -- Custom hooks (useCommandHistory, useAutoComplete)
  lib/            -- Data, types, command registry, and ASCII art
scripts/          -- ASCII art generation script
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Customisation

All personal data lives in `src/lib/data.ts` -- edit that file to swap in your
own bio, projects, skills, experience, education, and certifications.

ASCII art headers are auto-generated from command names. To regenerate them:

```bash
npm run generate:ascii
```

## Deployment

The easiest way to deploy is via [Vercel](https://vercel.com):

```bash
npm run build
```

## Licence

MIT
