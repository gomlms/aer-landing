"use client";

import { useReveal } from "@/app/hooks/useReveal";

export default function Footer({ onBook }: { onBook: () => void }) {
  const ref = useReveal();

  return (
    <>
      {/* Final CTA */}
      <section
        ref={ref}
        className="bg-aer-950 px-6 py-20 lg:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="reveal stagger-1 font-display text-3xl font-bold leading-tight text-aer-50 lg:text-4xl xl:text-5xl">
            Ready to stop doing work that should be automated?
          </h2>

          <p className="reveal stagger-2 mt-6 max-w-2xl text-lg leading-relaxed text-aer-300">
            Book a free strategy call. We&apos;ll audit your workflows and show
            you exactly where AI can save your team time.
          </p>

          <div className="reveal stagger-3 mt-10">
            <button
              type="button"
              onClick={onBook}
              className="inline-block rounded-full bg-accent-500 px-10 py-4 text-base font-medium text-aer-950 transition-opacity hover:opacity-90"
            >
              Book a Strategy Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-aer-800 bg-aer-950 px-6 py-10 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-baseline gap-3">
            <img src="/logo.png" alt="Aer" className="h-6 w-6" />
            <span className="font-display text-lg font-bold text-accent-500">
              aer
            </span>
            <span className="text-sm text-aer-500">
              &copy; 2026 Aer. All rights reserved.
            </span>
          </div>

          <a
            href="/privacy"
            className="text-sm text-aer-400 transition-colors hover:text-aer-200"
          >
            Privacy
          </a>
        </div>
      </footer>
    </>
  );
}
