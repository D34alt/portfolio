"use client";

import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
const SCRAMBLE_DURATION_MS = 300;
const FRAME_INTERVAL_MS = 30;

interface Props {
  text: string;
}

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function ScrambleText({ text }: Props) {
  const [display, setDisplay] = useState(text);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Nothing to animate for blank lines
    if (text.trim().length === 0) {
      setDisplay(text);
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

      // Characters up to revealIndex are locked in as the real text.
      // The rest are still scrambled.
      const revealIndex = Math.floor(progress * text.length);

      const chars = text.split("").map((ch, i) => {
        if (i < revealIndex) return ch;
        if (ch === " ") return " ";
        return randomChar();
      });

      setDisplay(chars.join(""));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [text]);

  return <>{display}</>;
}
