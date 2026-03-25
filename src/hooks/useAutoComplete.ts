"use client";

import { useCallback } from "react";
import { getCommandNames } from "@/lib/commands";

export function useAutoComplete() {
  const complete = useCallback((input: string): string | null => {
    const trimmed = input.trimStart();
    if (!trimmed) return null;

    // Only autocomplete the command name (first word)
    const parts = trimmed.split(/\s+/);
    if (parts.length > 1) return null;

    const partial = parts[0].toLowerCase();
    const matches = getCommandNames().filter((name) =>
      name.startsWith(partial)
    );

    if (matches.length === 1) {
      return matches[0];
    }

    return null;
  }, []);

  /** Return the first matching command for a partial input (for inline hints). */
  const suggest = useCallback((input: string): string | null => {
    const trimmed = input.trimStart();
    if (!trimmed) return null;

    const parts = trimmed.split(/\s+/);
    if (parts.length > 1) return null;

    const partial = parts[0].toLowerCase();
    // Don't suggest if the input already exactly matches a command
    const names = getCommandNames();
    if (names.includes(partial)) return null;

    const match = names.find((name) => name.startsWith(partial));
    return match ?? null;
  }, []);

  return { complete, suggest };
}
