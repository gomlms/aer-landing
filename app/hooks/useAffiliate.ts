"use client";

import { useEffect, useState } from "react";

const REF_KEY = "aer-ref";

export function useAffiliate() {
  const [ref, setRef] = useState<string | null>(null);

  useEffect(() => {
    // Check URL params first
    const params = new URLSearchParams(window.location.search);
    const urlRef = params.get("ref");

    if (urlRef) {
      // Store in sessionStorage so it persists across page navigations
      sessionStorage.setItem(REF_KEY, urlRef);
      setRef(urlRef);
    } else {
      // Check sessionStorage for previously captured ref
      const stored = sessionStorage.getItem(REF_KEY);
      if (stored) setRef(stored);
    }
  }, []);

  // Track the visit (fire once)
  useEffect(() => {
    const tracked = sessionStorage.getItem("aer-tracked");
    if (tracked) return;

    sessionStorage.setItem("aer-tracked", "1");

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ref: ref ?? sessionStorage.getItem(REF_KEY),
        path: window.location.pathname,
        referrer: document.referrer || null,
      }),
    }).catch(() => {
      // silently fail — tracking should never break the page
    });
  }, [ref]);

  return ref;
}
