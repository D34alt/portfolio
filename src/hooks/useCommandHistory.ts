"use client";

import { useState, useCallback } from "react";

export function useCommandHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addToHistory = useCallback((command: string) => {
    if (command.trim()) {
      setHistory((prev) => [...prev, command.trim()]);
    }
    setHistoryIndex(-1);
  }, []);

  const navigateUp = useCallback((): string | null => {
    if (history.length === 0) return null;

    const newIndex =
      historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);

    setHistoryIndex(newIndex);
    return history[newIndex];
  }, [history, historyIndex]);

  const navigateDown = useCallback((): string | null => {
    if (historyIndex === -1) return null;

    const newIndex = historyIndex + 1;
    if (newIndex >= history.length) {
      setHistoryIndex(-1);
      return "";
    }

    setHistoryIndex(newIndex);
    return history[newIndex];
  }, [history, historyIndex]);

  const resetIndex = useCallback(() => {
    setHistoryIndex(-1);
  }, []);

  return { history, addToHistory, navigateUp, navigateDown, resetIndex };
}
