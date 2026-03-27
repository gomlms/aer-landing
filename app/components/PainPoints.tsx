"use client";

import { useReveal } from "@/app/hooks/useReveal";

const painPoints = [
  {
    headline: "Your team copies data between 6 tools. Every day.",
    description:
      "That's 15 hours a week of work that doesn't move the needle. It's expensive, error-prone, and your best people hate it.",
    metric: "15 hrs/week wasted",
  },
  {
    headline: "Someone spends every Monday morning building the same report.",
    description:
      "By the time leadership reads it, the data is stale. Decisions get made on last week's numbers while this week's problems compound.",
    metric: "8 hrs/week on reports nobody reads in time",
  },
  {
    headline: "Customer onboarding takes 3 days of back-and-forth.",
    description:
      "Emails, forms, manual account setup, waiting on approvals. Your new customers start the relationship frustrated, and your ops team drowns in tickets.",
    metric: "72-hour onboarding that should take 10 minutes",
  },
] as const;

export default function PainPoints() {
  const ref = useReveal();

  return (
    <section ref={ref} className="bg-aer-950 px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="reveal stagger-1 font-mono text-sm text-accent-500">
          0.2
        </p>

        <h2 className="reveal stagger-2 mt-4 font-display text-3xl font-bold leading-tight text-aer-50 lg:text-4xl">
          The cost of doing nothing
        </h2>

        <div className="mt-16 space-y-14 lg:mt-20">
          {painPoints.map((point, i) => (
            <div
              key={i}
              className="reveal stagger-3 group border-l-2 border-aer-700 pl-6 transition-colors duration-300 hover:border-accent-500 lg:pl-8"
            >
              <h3 className="font-display text-lg font-semibold text-aer-100 lg:text-xl">
                {point.headline}
              </h3>

              <p className="mt-3 max-w-2xl text-base leading-relaxed text-aer-400">
                {point.description}
              </p>

              <p className="mt-4 font-mono text-sm font-medium text-accent-500">
                {point.metric}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
