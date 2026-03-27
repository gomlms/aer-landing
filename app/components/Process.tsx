"use client";

import { useReveal } from "@/app/hooks/useReveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We audit your current workflows, identify bottlenecks, and map the highest-impact automation opportunities.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "We architect the solution \u2014 choosing the right AI models, integrations, and data flows for your specific stack.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We build, test, and deploy your automations. First workflow live in under two weeks.",
  },
  {
    number: "04",
    title: "Maintain",
    description:
      "We monitor performance, handle edge cases, and continuously optimize as your needs evolve.",
  },
] as const;

export default function Process() {
  const ref = useReveal();

  return (
    <section ref={ref} className="bg-aer-950 px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="reveal stagger-1 font-mono text-sm text-accent-500">
          0.6
        </p>

        <h2 className="reveal stagger-2 mt-4 font-display text-3xl font-bold leading-tight text-aer-50 lg:text-4xl">
          How we work
        </h2>

        <div className="reveal stagger-3 relative mt-16 flex flex-col gap-10 lg:mt-20 lg:flex-row lg:gap-0">
          {/* Horizontal connector line — desktop only */}
          <div
            className="pointer-events-none absolute top-5 right-0 left-0 hidden h-px bg-aer-700 lg:block"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <div
              key={i}
              className="relative flex-1 lg:pr-8"
            >
              {/* Step number with dot on the line */}
              <div className="relative z-10 mb-4 flex items-center gap-3 lg:mb-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-aer-700 bg-aer-950 font-mono text-sm font-medium text-accent-500">
                  {step.number}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-aer-100">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-aer-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
