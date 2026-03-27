"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-aer-950/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a
          href="/"
          className="font-display text-xl font-bold tracking-tight text-accent-500"
        >
          aer
        </a>

        <a
          href="#book"
          className="rounded-full bg-accent-500 px-5 py-2 text-sm font-medium text-aer-950 transition-opacity hover:opacity-90"
        >
          Book a Call
        </a>
      </div>
    </nav>
  );
}
