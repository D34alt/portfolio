"use client";

import { useState, useEffect } from "react";

const FULL_TITLE = "Danny Nguyen ~ terminal portfolio  v1.0.0";
const SHORT_TITLE = "Danny Nguyen ~ portfolio v1.0.0";
const SM_BREAKPOINT = 640;

function buildBanner(title: string): string {
  const padding = 3;
  const width = title.length + padding * 2;
  const border = "\u2550".repeat(width);
  const empty = " ".repeat(width);
  const padded = " ".repeat(padding) + title + " ".repeat(padding);

  return [
    `\u2554${border}\u2557`,
    `\u2551${empty}\u2551`,
    `\u2551${padded}\u2551`,
    `\u2551${empty}\u2551`,
    `\u255A${border}\u255D`,
  ].join("\n");
}

export default function AsciiArt() {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${SM_BREAKPOINT - 1}px)`);
    setIsSmall(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsSmall(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const banner = buildBanner(isSmall ? SHORT_TITLE : FULL_TITLE);

  return (
    <pre className="text-cyan-400 text-xs sm:text-sm leading-relaxed select-none mb-2">
      {banner}
    </pre>
  );
}
