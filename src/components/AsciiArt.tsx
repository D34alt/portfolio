"use client";

export default function AsciiArt() {
  const title = "Danny Nguyen ~ terminal portfolio  v1.0.0";
  const padding = 3;
  const width = title.length + padding * 2;
  const border = "\u2550".repeat(width);
  const empty = " ".repeat(width);
  const padded = " ".repeat(padding) + title + " ".repeat(padding);

  const banner = [
    `\u2554${border}\u2557`,
    `\u2551${empty}\u2551`,
    `\u2551${padded}\u2551`,
    `\u2551${empty}\u2551`,
    `\u255A${border}\u255D`,
  ].join("\n");

  return (
    <pre className="text-cyan-400 text-xs sm:text-sm leading-relaxed select-none mb-2">
      {banner}
    </pre>
  );
}
