"use client";

import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
const SCRAMBLE_DURATION_MS = 300;
const FRAME_INTERVAL_MS = 30;

interface Props {
  text: string;
  reverse?: boolean;
  onComplete?: () => void;
}

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function ScrambleText({ text, reverse = false, onComplete }: Props) {
  const [display, setDisplay] = useState(reverse ? text : text);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Nothing to animate for blank lines
    if (text.trim().length === 0) {
      setDisplay(text);
      onComplete?.();
      return;
    }

    startTimeRef.current = performance.now();
    let lastFrame = 0;

    function tick(now: number) {
      const elapsed = now - (startTimeRef.current ?? now);
      const progress = Math.min(elapsed / SCRAMBLE_DURATION_MS, 1);

      // Only update at roughly FRAME_INTERVAL_MS intervals
      if (now - lastFrame < FRAME_INTERVAL_MS && progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      lastFrame = now;

      if (reverse) {
        // Scramble out: characters from the start dissolve into noise,
        // then collapse to nothing once fully scrambled.
        const dissolveIndex = Math.floor(progress * text.length);

        const chars = text.split("").map((ch, i) => {
          if (i < dissolveIndex) return "";
          if (ch === " ") return " ";
          return randomChar();
        });

        setDisplay(chars.join(""));
      } else {
        // Scramble in: characters reveal left to right.
        const revealIndex = Math.floor(progress * text.length);

        const chars = text.split("").map((ch, i) => {
          if (i < revealIndex) return ch;
          if (ch === " ") return " ";
          return randomChar();
        });

        setDisplay(chars.join(""));
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        onComplete?.();
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [text, reverse, onComplete]);

  return <>{display}</>;
}
