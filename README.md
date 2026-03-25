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
- Responsive layout with mobile-specific optimisations
  - Inline ghost autocomplete with Space-to-accept on mobile
  - Shortened banner and plain-text headers for narrow screens
  - Tappable links with visible underlines
  - Viewport-aware tips and command descriptions
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

## Deployment

The easiest way to deploy is via [Vercel](https://vercel.com):

```bash
npm run build
```