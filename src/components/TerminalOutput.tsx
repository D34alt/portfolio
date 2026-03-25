"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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
    case "header":
      return "text-cyan-400";
    case "tip":
      return "text-slate-500 italic";
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
  const isMobileRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    isMobileRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => { isMobileRef.current = e.matches; };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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

  const copyLabel = isMobileRef.current ? "Copied!" : "Copied to clipboard!";

  return (
    <span
      onClick={handleClick}
      className="hover:underline cursor-pointer inline-flex items-center gap-2"
      style={{ whiteSpace: "pre-wrap" }}
    >
      <ScrambleText text={line.content} />
      {phase === "visible" && (
        <span className="text-teal-400 text-xs select-none">
          <ScrambleText key={`copy-in-${key}`} text={copyLabel} />
        </span>
      )}
      {phase === "exiting" && (
        <span className="text-teal-400 text-xs select-none">
          <ScrambleText
            key={`copy-out-${key}`}
            text={copyLabel}
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
    <div className="break-anywhere">
      {lines.map((line) => (
        <div key={line.id} className={`${getLineColour(line.type)} leading-6 ${(line.type === "ascii" || line.visibility === "desktop") && line.visibility !== "all" ? "hidden sm:block" : ""} ${line.type === "header" || line.visibility === "mobile" ? "sm:hidden" : ""} ${line.type === "header" ? "font-bold text-sm" : ""}`}>
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
              className="underline decoration-slate-600 sm:no-underline sm:hover:underline cursor-pointer"
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
