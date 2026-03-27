"use client";

import { useState } from "react";
import { useReveal } from "@/app/hooks/useReveal";

const faqs = [
  {
    question: "How long until the first automation is live?",
    answer:
      "Most clients see their first workflow running within two weeks. Complex multi-system integrations may take 3-4 weeks.",
  },
  {
    question: "Do we need technical staff on our end?",
    answer:
      "No. We handle everything from design to deployment to maintenance. Your team just needs to tell us what\u2019s painful.",
  },
  {
    question: "What tools and platforms do you integrate with?",
    answer:
      "We work with whatever you\u2019re already using \u2014 Shopify, HubSpot, Salesforce, Slack, Google Workspace, custom APIs, databases, and more. If it has an API, we can connect it.",
  },
  {
    question: "What happens if something breaks?",
    answer:
      "We monitor all automations 24/7. If an edge case comes up, we fix it \u2014 usually before you notice. Maintenance is included.",
  },
  {
    question: "How is this different from Zapier or Make?",
    answer:
      "Those tools are great for simple triggers. We build intelligent systems that handle complex logic, make decisions, process unstructured data, and improve over time. Think of us as the engineering team for your automation stack.",
  },
  {
    question: "What does it cost?",
    answer:
      "Every project is custom-priced based on the workflows we\u2019re automating, the systems involved, and the complexity. We start by understanding your day-to-day \u2014 your tools, your processes, where time is being lost. From there we\u2019ll come back with a clear plan and next steps within a few days.",
  },
] as const;

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-aer-800">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-base font-medium text-aer-100 lg:text-lg">
          {faq.question}
        </span>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center text-aer-400 transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 0.5V13.5M0.5 7H13.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-base leading-relaxed text-aer-300">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const ref = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="bg-aer-950 px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="reveal stagger-1 font-mono text-sm text-accent-500">
          0.7
        </p>

        <h2 className="reveal stagger-2 mt-4 font-display text-3xl font-bold leading-tight text-aer-50 lg:text-4xl">
          Common questions
        </h2>

        <div className="reveal stagger-3 mt-14 lg:mt-16">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() =>
                setOpenIndex(openIndex === i ? null : i)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
