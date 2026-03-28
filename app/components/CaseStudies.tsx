"use client";

import { useReveal } from "@/app/hooks/useReveal";
import WorkflowDiagram from "@/app/components/WorkflowDiagram";

import type { ComponentProps } from "react";

type WorkflowNodes = ComponentProps<typeof WorkflowDiagram>["nodes"];

const ecommerceWorkflow: WorkflowNodes = [
  { id: "1", label: "Email Inbox" },
  { id: "2", label: "Parse Orders" },
  { id: "3", label: "Update Warehouse" },
  { id: "4", label: "Sync Shopify" },
  { id: "5", label: "Reorder Calc" },
  { id: "6", label: "Place PO" },
];

const financeWorkflow: WorkflowNodes = [
  { id: "1", label: "CUSIP Watchlist" },
  { id: "2", label: "Scan News" },
  { id: "3", label: "Summarize" },
  { id: "4", label: "Link Sources" },
  { id: "5", label: "Update Excel" },
  { id: "6", label: "Alert Team" },
];

const supportWorkflow: WorkflowNodes = [
  { id: "1", label: "Aggregate Tickets" },
  { id: "2", label: "Classify Type" },
  { id: "3", label: "Auto-Answer" },
  { id: "4", label: "Surface New" },
  { id: "5", label: "Escalate" },
];

const workflows = [ecommerceWorkflow, financeWorkflow, supportWorkflow];

const caseStudies = [
  {
    industry: "ECOMMERCE",
    problem:
      "A DTC brand spending 25 hours/week on inventory and order management",
    result:
      "Automated inventory sync, order routing, and restock alerts across 3 warehouses",
    metrics: ["25 hrs/week \u2192 2 hrs/week", "94% fewer stockouts"],
  },
  {
    industry: "FINANCIAL SERVICES",
    problem:
      "A hedge fund\u2019s analysts manually compiling market reports from 12 sources every morning",
    result:
      "Automated data aggregation, analysis, and formatted report delivery by 6am daily",
    metrics: ["3 hrs/day \u2192 0 hrs/day", "Reports ready 4 hours earlier"],
  },
  {
    industry: "SMALL BUSINESS",
    problem:
      "A services firm losing leads because follow-ups took 48+ hours",
    result:
      "Automated lead qualification, instant follow-up sequences, and CRM updates",
    metrics: [
      "48hr response \u2192 3 min response",
      "3x more qualified meetings",
    ],
  },
] as const;

export default function CaseStudies() {
  const ref = useReveal();

  return (
    <section ref={ref} className="bg-aer-950 px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="reveal stagger-1 font-mono text-sm text-accent-500">
          0.5
        </p>

        <h2 className="reveal stagger-2 mt-4 font-display text-3xl font-bold leading-tight text-aer-50 lg:text-4xl">
          Results, not promises
        </h2>

        <div className="mt-16 lg:mt-20">
          {caseStudies.map((study, i) => (
            <div
              key={i}
              className={`reveal stagger-${i + 3} py-10 ${
                i < caseStudies.length - 1 ? "border-b border-aer-800" : ""
              } ${i === 0 ? "pt-0" : ""}`}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-accent-500">
                {study.industry}
              </p>

              <h3 className="mt-4 text-lg font-semibold text-aer-100">
                {study.problem}
              </h3>

              <p className="mt-2 text-base leading-relaxed text-aer-300">
                {study.result}
              </p>

              <div className="mt-5 flex flex-wrap gap-x-10 gap-y-2">
                {study.metrics.map((metric, j) => (
                  <p
                    key={j}
                    className="font-mono text-sm font-medium text-accent-400"
                  >
                    {metric}
                  </p>
                ))}
              </div>

              <div className="mt-8">
                <WorkflowDiagram nodes={workflows[i]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
