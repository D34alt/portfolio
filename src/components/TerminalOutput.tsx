"use client";

import { TerminalLine } from "@/lib/types";

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
          ) : (
            <span style={{ whiteSpace: "pre-wrap" }}>{line.content}</span>
          )}
        </div>
      ))}
    </div>
  );
}
