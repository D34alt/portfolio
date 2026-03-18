"use client";

import { forwardRef } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CommandInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, onSubmit, onKeyDown }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onSubmit();
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
