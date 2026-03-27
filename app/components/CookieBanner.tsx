"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "aer-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] border-t border-aer-800 bg-aer-900/95 px-6 py-4 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-aer-300">
          We use cookies and similar technologies to improve your experience and
          identify visitors.{" "}
          <a
            href="/privacy"
            className="text-accent-400 underline underline-offset-2 transition-colors hover:text-accent-300"
          >
            Privacy Policy
          </a>
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={decline}
            className="rounded-full border border-aer-600 px-4 py-1.5 text-xs font-medium text-aer-300 transition-colors hover:border-aer-400 hover:text-aer-100"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-accent-500 px-4 py-1.5 text-xs font-medium text-aer-950 transition-opacity hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
