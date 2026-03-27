"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useReveal } from "@/app/hooks/useReveal";

/* ------------------------------------------------------------------ */
/*  CountUp — animates a number from 0 to target on scroll into view   */
/* ------------------------------------------------------------------ */

function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 1500,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const elRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${prefix}${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [target, suffix, prefix, duration]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return <span ref={elRef}>{display}</span>;
}

/* ------------------------------------------------------------------ */
/*  MetricDisplay — renders the right display for each metric          */
/* ------------------------------------------------------------------ */

function MetricDisplay({ metric }: { metric: string }) {
  // Static metrics that don't animate
  if (metric === "<2 wk" || metric === "24/7") {
    return <>{metric}</>;
  }

  // "3x" -> count to 3, suffix "x"
  if (metric === "3x") {
    return <CountUp target={3} suffix="x" />;
  }

  // "20+" -> count to 20, suffix "+"
  if (metric === "20+") {
    return <CountUp target={20} suffix="+" />;
  }

  // "73%" -> count to 73, suffix "%"
  if (metric === "73%") {
    return <CountUp target={73} suffix="%" />;
  }

  // "90%" -> count to 90, suffix "%"
  if (metric === "90%") {
    return <CountUp target={90} suffix="%" />;
  }

  // Fallback for any unrecognized metric
  return <>{metric}</>;
}

/* ------------------------------------------------------------------ */
/*  Benefits                                                           */
/* ------------------------------------------------------------------ */

const benefits = [
  {
    metric: "20+",
    label: "hours saved per week",
    detail: "Your team focuses on strategy, not spreadsheets",
  },
  {
    metric: "73%",
    label: "reduction in errors",
    detail: "AI doesn't fat-finger data or forget a step",
  },
  {
    metric: "<2 wk",
    label: "time to first workflow",
    detail: "We ship fast. First automation live in under two weeks",
  },
  {
    metric: "24/7",
    label: "operations without overtime",
    detail: "Workflows run while your team sleeps",
  },
  {
    metric: "90%",
    label: "reduction in onboarding time",
    detail: "New customers set up in minutes, not days",
  },
  {
    metric: "3x",
    label: "faster report turnaround",
    detail: "Monday morning reports ready before Monday morning",
  },
] as const;

export default function Benefits() {
  const ref = useReveal();

  return (
    <section ref={ref} className="bg-aer-950 px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="reveal stagger-1 font-mono text-sm text-accent-500">
          0.4
        </p>

        <h2 className="reveal stagger-2 mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-aer-50 lg:text-4xl">
          What changes when you work with us
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-y-16 lg:mt-20">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className={`reveal stagger-${i + 3} px-0 md:px-8 ${
                i % 3 !== 0
                  ? "md:border-l md:border-aer-800"
                  : ""
              } ${
                i >= 3
                  ? "md:border-t md:border-aer-800 md:pt-12"
                  : ""
              }`}
            >
              <p className="font-display text-4xl font-bold text-accent-400 lg:text-5xl">
                <MetricDisplay metric={benefit.metric} />
              </p>

              <p className="mt-3 text-base font-medium text-aer-100">
                {benefit.label}
              </p>

              <p className="mt-1 text-sm leading-relaxed text-aer-400">
                {benefit.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
