"use client";

import { useState, useCallback } from "react";
import { TerminalLine } from "@/lib/types";
import ScrambleText from "./ScrambleText";

interface Props {
  lines: TerminalLine[];
}

function getLineColour(type: TerminalLine["type"]): string {
  switch (type) {
    case "input":
      return "text-slate-300";
    case "output":
      return "text-slate-300";
    case "error":
      return "text-red-400";
    case "ascii":
      return "text-cyan-400";
    case "system":
      return "text-slate-500";
    default:
      return "text-slate-300";
  }
}

type CopyPhase = "idle" | "visible" | "exiting";

function CopyableLine({ line }: { line: TerminalLine }) {
  const [phase, setPhase] = useState<CopyPhase>("idle");
  const [key, setKey] = useState(0);

  const handleClick = useCallback(async () => {
    if (!line.copyText || phase !== "idle") return;
    await navigator.clipboard.writeText(line.copyText);
    setKey((k) => k + 1);
    setPhase("visible");
    setTimeout(() => setPhase("exiting"), 1200);
  }, [line.copyText, phase]);

  const handleExitComplete = useCallback(() => {
    setPhase("idle");
  }, []);

  return (
    <span
      onClick={handleClick}
      className="hover:underline cursor-pointer inline-flex items-center gap-2"
      style={{ whiteSpace: "pre-wrap" }}
    >
      <ScrambleText text={line.content} />
      {phase === "visible" && (
        <span className="text-teal-400 text-xs select-none">
          <ScrambleText key={`copy-in-${key}`} text="Copied to clipboard!" />
        </span>
      )}
      {phase === "exiting" && (
        <span className="text-teal-400 text-xs select-none">
          <ScrambleText
            key={`copy-out-${key}`}
            text="Copied to clipboard!"
            reverse
            onComplete={handleExitComplete}
          />
        </span>
      )}
    </span>
  );
}

export default function TerminalOutput({ lines }: Props) {
  return (
    <div>
      {lines.map((line) => (
        <div key={line.id} className={`${getLineColour(line.type)} leading-6`}>
          {line.type === "input" ? (
            <span>
              <span className="text-teal-400">visitor</span>
              <span className="text-slate-500">@</span>
              <span className="text-cyan-400">danny</span>
              <span className="text-slate-500">:~$ </span>
              <span className="text-slate-300">{line.content}</span>
            </span>
          ) : line.copyText ? (
            <CopyableLine line={line} />
          ) : line.href ? (
            <a
              href={line.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline cursor-pointer"
            >
              <span style={{ whiteSpace: "pre-wrap" }}>
                <ScrambleText text={line.content} />
              </span>
            </a>
          ) : (
            <span style={{ whiteSpace: "pre-wrap" }}>
              <ScrambleText text={line.content} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
