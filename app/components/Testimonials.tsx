"use client";

import { useReveal } from "@/app/hooks/useReveal";

const TESTIMONIALS = [
  {
    quote:
      "We used their recording tool to map out a few of our day to day workflows, and honestly, I was shocked. I didn\u2019t realize how much time we were losing to small, repetitive tasks until we saw it laid out. The whole experience was incredibly seamless, and within days we had automations in place that are saving us close to 3 hours a day.",
    name: "Ethan K.",
  },
  {
    quote:
      "I was hesitant at first, but this ended up replacing multiple manual processes we\u2019d been duct-taping together for years. It runs quietly in the background now, and I don\u2019t have to think about it. We\u2019re saving around 12 to 15 hours a week.",
    name: "Daniel R.",
  },
  {
    quote:
      "We didn\u2019t need more tools \u2014 we needed our existing ones to actually work together. This finally made that happen. Orders, fulfillment, and customer updates are all in sync now.",
    name: "Melissa T.",
  },
  {
    quote:
      "We couldn\u2019t justify hiring ops help yet, but we were drowning in manual work. This gave us leverage immediately without adding headcount. We\u2019re saving about 15 hours a week already.",
    name: "Priya S.",
  },
  {
    quote:
      "What stood out was how quickly they understood our workflows. They didn\u2019t just automate \u2014 they simplified things we didn\u2019t realize were overly complex.",
    name: "Alex G.",
  },
  {
    quote:
      "I\u2019m not technical at all, but they handled everything. The result is simple \u2014 less busywork, fewer mistakes, and more time back in my day.",
    name: "Rachel P.",
  },
  {
    quote:
      "As we grew, things started breaking \u2014 missed steps, manual errors, delays. This stabilized everything. It feels like we finally have real infrastructure. We\u2019re saving 15+ hours a week and way fewer headaches.",
    name: "Marcus H.",
  },
] as const;

export default function Testimonials() {
  const ref = useReveal();

  return (
    <section ref={ref} className="bg-aer-950 px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`reveal stagger-${Math.min(i + 1, 6)} border-l-2 border-accent-500/20 pl-6`}
            >
              <p className="text-sm leading-relaxed text-aer-200 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-3 text-xs font-medium tracking-wide text-aer-400">
                {t.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
