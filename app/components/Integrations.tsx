"use client";

import { useReveal } from "@/app/hooks/useReveal";

const INTEGRATIONS = [
  { name: "Shopify", slug: "shopify" },
  { name: "HubSpot", slug: "hubspot" },
  { name: "Salesforce", slug: "salesforce" },
  { name: "Slack", slug: "slack" },
  { name: "Google", slug: "google" },
  { name: "Stripe", slug: "stripe" },
  { name: "Notion", slug: "notion" },
  { name: "Airtable", slug: "airtable" },
  { name: "QuickBooks", slug: "quickbooks" },
  { name: "Excel", slug: "microsoftexcel" },
  { name: "Gmail", slug: "gmail" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Twilio", slug: "twilio" },
  { name: "Zapier", slug: "zapier" },
] as const;

export default function Integrations() {
  const ref = useReveal();

  return (
    <section ref={ref} className="bg-aer-950 px-6 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="reveal text-center text-sm tracking-wide text-aer-400">
          Works with the tools you already use
        </p>

        <div className="reveal stagger-1 mt-10 grid grid-cols-3 gap-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
          {INTEGRATIONS.map(({ name, slug }) => (
            <div
              key={slug}
              className="flex flex-col items-center gap-2.5 text-aer-500 transition-colors hover:text-aer-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${slug}/4a5068`}
                alt={name}
                width={24}
                height={24}
                className="h-6 w-6 transition-opacity hover:opacity-80"
                loading="lazy"
              />
              <span className="text-[11px] tracking-wide">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
