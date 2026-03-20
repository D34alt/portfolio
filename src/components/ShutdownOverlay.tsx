"use client";

import { useState, useEffect, useCallback } from "react";

const SHUTDOWN_SEQUENCE = [
  { text: "[  OK  ] Stopping user session...", delay: 200 },
  { text: "[  OK  ] Flushing file buffers...", delay: 900 },
  { text: "[  OK  ] Unmounting filesystems...", delay: 1600 },
  { text: "[  OK  ] Reached target shutdown.", delay: 2300 },
  { text: "[FAILED] Kernel panic - not syncing: Attempted to kill init!", delay: 3100 },
  { text: "---[ end Kernel panic - not syncing ]---", delay: 3800 },
];

const BLACKOUT_DELAY = 4600;
const REBOOT_DELAY = 6000;

interface Props {
  onComplete: () => void;
}

export default function ShutdownOverlay({ onComplete }: Props) {
  const [messages, setMessages] = useState<string[]>([]);
  const [isBlack, setIsBlack] = useState(false);

  const stableOnComplete = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    SHUTDOWN_SEQUENCE.forEach(({ text, delay }) => {
      timeouts.push(
        setTimeout(() => {
          setMessages((prev) => [...prev, text]);
        }, delay)
      );
    });

    timeouts.push(
      setTimeout(() => setIsBlack(true), BLACKOUT_DELAY)
    );

    timeouts.push(
      setTimeout(() => stableOnComplete(), REBOOT_DELAY)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [stableOnComplete]);

  return (
    <div className="absolute inset-0 z-40 bg-slate-950 flex flex-col p-4 overflow-hidden">
      {isBlack ? (
        <div className="absolute inset-0 bg-black" />
      ) : (
        messages.map((msg, i) => (
          <div
            key={i}
            className={`leading-6 font-mono text-sm ${
              msg.startsWith("[FAILED]") || msg.startsWith("---[")
                ? "text-red-400"
                : "text-slate-300"
            }`}
          >
            {msg}
          </div>
        ))
      )}
    </div>
  );
}
