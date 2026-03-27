"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // ease-out quad for smooth deceleration
      const eased = 1 - (1 - t) * (1 - t);
      setProgress(eased * 100);

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        // Progress complete -- start fade out
        setTimeout(() => {
          setVisible(false);
          // Remove from DOM after fade transition
          setTimeout(() => setMounted(false), 500);
        }, 150);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-aer-950 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <span className="font-display text-3xl font-bold tracking-tight text-accent-500">
        aer
      </span>

      <div className="mt-5 h-[2px] w-48 overflow-hidden rounded-full bg-aer-800">
        <div
          className="h-full rounded-full bg-accent-500 transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
