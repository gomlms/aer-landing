"use client";

import { useReveal } from "@/app/hooks/useReveal";

const capabilities = [
  {
    number: "01",
    title: "Workflow Automation",
    description:
      "Connect your tools and eliminate manual handoffs between systems",
  },
  {
    number: "02",
    title: "Data Processing",
    description:
      "Extract, transform, and route data without human bottlenecks",
  },
  {
    number: "03",
    title: "Customer Operations",
    description:
      "Automate onboarding, support triage, and follow-ups",
  },
  {
    number: "04",
    title: "Intelligent Reporting",
    description:
      "Generate reports that arrive before anyone asks for them",
  },
] as const;

export default function Solution() {
  const ref = useReveal();

  return (
    <section ref={ref} className="bg-aer-950 px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="reveal stagger-1 font-mono text-sm text-accent-500">
          0.3
        </p>

        <h2 className="reveal stagger-2 mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-aer-50 lg:text-4xl">
          We build AI systems that run your operations
        </h2>

        <p className="reveal stagger-3 mt-5 max-w-2xl text-lg leading-relaxed text-aer-300">
          Not another chatbot. Not a dashboard you&apos;ll never open. Actual
          automation that does the work.
        </p>

        {/* Bento-style asymmetric grid */}
        <div className="mt-16 grid grid-cols-1 gap-px bg-aer-800 md:grid-cols-3 lg:mt-20">
          {/* Item 1 -- spans 2 columns */}
          <div className="reveal stagger-4 col-span-1 bg-aer-900 p-8 md:col-span-2 lg:p-10">
            <span className="font-mono text-xs tracking-wider text-accent-500">
              {capabilities[0].number}
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-aer-50">
              {capabilities[0].title}
            </h3>
            <p className="mt-2 max-w-md text-base leading-relaxed text-aer-300">
              {capabilities[0].description}
            </p>
          </div>

          {/* Item 2 -- single column */}
          <div className="reveal stagger-5 col-span-1 bg-aer-900 p-8 lg:p-10">
            <span className="font-mono text-xs tracking-wider text-accent-500">
              {capabilities[1].number}
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-aer-50">
              {capabilities[1].title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-aer-300">
              {capabilities[1].description}
            </p>
          </div>

          {/* Item 3 -- single column */}
          <div className="reveal stagger-6 col-span-1 bg-aer-900 p-8 lg:p-10">
            <span className="font-mono text-xs tracking-wider text-accent-500">
              {capabilities[2].number}
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-aer-50">
              {capabilities[2].title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-aer-300">
              {capabilities[2].description}
            </p>
          </div>

          {/* Item 4 -- spans 2 columns */}
          <div className="reveal stagger-7 col-span-1 bg-aer-900 p-8 md:col-span-2 lg:p-10">
            <span className="font-mono text-xs tracking-wider text-accent-500">
              {capabilities[3].number}
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-aer-50">
              {capabilities[3].title}
            </h3>
            <p className="mt-2 max-w-md text-base leading-relaxed text-aer-300">
              {capabilities[3].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
