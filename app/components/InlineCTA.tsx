"use client";

import { useReveal } from "@/app/hooks/useReveal";

export default function InlineCTA({ onBook }: { onBook: () => void }) {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      className="border-y border-aer-800 bg-aer-900/50 px-6 py-14 lg:px-8 lg:py-16"
    >
      <div className="reveal mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-lg font-semibold text-aer-50 lg:text-xl">
            See how automation could work for your team
          </p>
          <p className="mt-1 text-sm text-aer-400">
            We&apos;ll map your workflows and show you where AI saves the most
            time.
          </p>
        </div>
        <button
          type="button"
          onClick={onBook}
          className="shrink-0 rounded-full bg-accent-500 px-8 py-3 text-sm font-medium text-aer-950 transition-opacity hover:opacity-90"
        >
          Book a Free Strategy Call
        </button>
      </div>
    </section>
  );
}
