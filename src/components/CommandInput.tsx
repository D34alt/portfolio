"use client";

import { forwardRef, useRef, useEffect } from "react";

interface Props {
  value: string;
  suggestion: string | null;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CommandInput = forwardRef<HTMLInputElement, Props>(
  ({ value, suggestion, onChange, onSubmit, onKeyDown }, ref) => {
    const ghost = suggestion ? suggestion.slice(value.trimStart().length) : "";
    const isMobileRef = useRef(false);

    useEffect(() => {
      const mq = window.matchMedia("(max-width: 639px)");
      isMobileRef.current = mq.matches;
      const handler = (e: MediaQueryListEvent) => { isMobileRef.current = e.matches; };
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onSubmit();
        return;
      }
      // Accept suggestion on Space (mobile only)
      if (e.key === " " && isMobileRef.current && suggestion && ghost) {
        e.preventDefault();
        onChange(suggestion);
        return;
      }
      onKeyDown(e);
    };

    return (
      <div className="flex items-center leading-6">
        <span className="text-teal-400 shrink-0">visitor</span>
        <span className="text-slate-500 shrink-0">@</span>
        <span className="text-cyan-400 shrink-0">danny</span>
        <span className="text-slate-500 shrink-0">:~$&nbsp;</span>
        <div className="relative flex-1 min-w-0">
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-slate-300 outline-none caret-transparent font-[inherit]"
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {ghost && (
            <span
              className="absolute top-0 pointer-events-none text-slate-600 select-none"
              style={{ left: `${value.length}ch` }}
            >
              {ghost}
            </span>
          )}
          <span
            className="cursor-blink absolute top-0 pointer-events-none text-slate-400"
            style={{ left: `${value.length}ch` }}
          >
            ▌
          </span>
        </div>
      </div>
    );
  }
);

CommandInput.displayName = "CommandInput";

export default CommandInput;
