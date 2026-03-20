"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import TitleBar from "./TitleBar";
import AsciiArt from "./AsciiArt";
import TerminalOutput from "./TerminalOutput";
import CommandInput from "./CommandInput";
import { useCommandHistory } from "@/hooks/useCommandHistory";
import { useAutoComplete } from "@/hooks/useAutoComplete";
import { executeCommand } from "@/lib/commands";
import { TerminalLine } from "@/lib/types";

const LINE_DELAY_MS = 30;

function createWelcomeLines(): TerminalLine[] {
  return [
    {
      id: "welcome-1",
      type: "system",
      content: "Welcome! Type 'help' to see available commands.",
    },
    { id: "welcome-2", type: "output", content: "" },
  ];
}

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>(createWelcomeLines());
  const [input, setInput] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pendingLinesRef = useRef<TerminalLine[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { history, addToHistory, navigateUp, navigateDown, resetIndex } =
    useCommandHistory();
  const { complete } = useAutoComplete();

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Auto-scroll to bottom whenever new lines are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Refocus the input once the animation finishes
  useEffect(() => {
    if (!isAnimating) {
      inputRef.current?.focus();
    }
  }, [isAnimating]);

  // Focus input when clicking anywhere in the terminal body
  const handleTerminalClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const stopAnimation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    pendingLinesRef.current = [];
    setIsAnimating(false);
  }, []);

  const handleSubmit = useCallback(() => {
    const inputLine: TerminalLine = {
      id: `input-${Date.now()}`,
      type: "input",
      content: input,
    };

    const { lines: outputLines, isClear } = executeCommand(input, history);

    if (isClear) {
      stopAnimation();
      setLines([]);
    } else {
      setLines((prev) => [...prev, inputLine]);

      if (outputLines.length > 0) {
        setIsAnimating(true);
        pendingLinesRef.current = [...outputLines];

        intervalRef.current = setInterval(() => {
          const next = pendingLinesRef.current.shift();
          if (next) {
            setLines((prev) => [...prev, next]);
          } else {
            stopAnimation();
          }
        }, LINE_DELAY_MS);
      }
    }

    if (input.trim()) {
      addToHistory(input);
    }

    setInput("");
  }, [input, history, addToHistory, stopAnimation]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = navigateUp();
        if (prev !== null) setInput(prev);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = navigateDown();
        if (next !== null) setInput(next);
      } else if (e.key === "Tab") {
        e.preventDefault();
        const completed = complete(input);
        if (completed) setInput(completed);
      } else {
        resetIndex();
      }
    },
    [input, navigateUp, navigateDown, complete, resetIndex]
  );

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950">
      <TitleBar />
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 cursor-text"
        onClick={handleTerminalClick}
      >
        <AsciiArt />
        <TerminalOutput lines={lines} />
        {!isAnimating && (
          <CommandInput
            ref={inputRef}
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
    </div>
  );
}
