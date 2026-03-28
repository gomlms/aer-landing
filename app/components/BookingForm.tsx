"use client";

import { useState, useCallback, useEffect } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const INDUSTRIES = [
  "Ecommerce / DTC",
  "Financial Services",
  "Professional Services",
  "Healthcare",
  "Real Estate",
  "SaaS / Tech",
  "Other",
] as const;

const TEAM_SIZES = [
  "Just me",
  "2–10",
  "11–50",
  "51–200",
  "200+",
] as const;

export default function BookingForm({
  isOpen,
  onClose,
  affiliateRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  affiliateRef?: string | null;
}) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [painPoint, setPainPoint] = useState("");

  // Close on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setFormState("submitting");

      try {
        const res = await fetch("/api/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            company,
            email,
            industry,
            teamSize,
            painPoint,
            ref: affiliateRef ?? undefined,
            referrer: document.referrer || undefined,
          }),
        });

        if (!res.ok) throw new Error("Submit failed");
        setFormState("success");
      } catch {
        setFormState("error");
      }
    },
    [name, company, email, industry, teamSize, painPoint, affiliateRef]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Book a strategy call"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-aer-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg rounded-2xl border border-aer-800 bg-aer-900 p-8 shadow-2xl lg:p-10">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-aer-400 transition-colors hover:text-aer-100"
          aria-label="Close"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2L14 14M14 2L2 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {formState === "success" ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/10">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-accent-500"
              >
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-aer-50">
              We&apos;ll be in touch
            </h3>
            <p className="mt-2 text-sm text-aer-300">
              We&apos;ll review your workflows and reach out within a few days
              with next steps.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-accent-500 px-6 py-2 text-sm font-medium text-aer-950 transition-opacity hover:opacity-90"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-display text-xl font-bold text-aer-50">
              Book a strategy call
            </h3>
            <p className="mt-1 text-sm text-aer-400">
              Tell us a bit about your business and what you want to automate.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Name + Company — side by side */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="book-name"
                    className="mb-1.5 block text-xs font-medium tracking-wide text-aer-300"
                  >
                    Name *
                  </label>
                  <input
                    id="book-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full rounded-lg border border-aer-700 bg-aer-950 px-3.5 py-2.5 text-sm text-aer-100 placeholder:text-aer-500 transition-colors focus:border-accent-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="book-company"
                    className="mb-1.5 block text-xs font-medium tracking-wide text-aer-300"
                  >
                    Company *
                  </label>
                  <input
                    id="book-company"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Inc."
                    className="w-full rounded-lg border border-aer-700 bg-aer-950 px-3.5 py-2.5 text-sm text-aer-100 placeholder:text-aer-500 transition-colors focus:border-accent-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="book-email"
                  className="mb-1.5 block text-xs font-medium tracking-wide text-aer-300"
                >
                  Email *
                </label>
                <input
                  id="book-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@acme.com"
                  className="w-full rounded-lg border border-aer-700 bg-aer-950 px-3.5 py-2.5 text-sm text-aer-100 placeholder:text-aer-500 transition-colors focus:border-accent-500 focus:outline-none"
                />
              </div>

              {/* Industry + Team Size — side by side */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="book-industry"
                    className="mb-1.5 block text-xs font-medium tracking-wide text-aer-300"
                  >
                    Industry
                  </label>
                  <select
                    id="book-industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-aer-700 bg-aer-950 px-3.5 py-2.5 text-sm text-aer-100 transition-colors focus:border-accent-500 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    {INDUSTRIES.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="book-team"
                    className="mb-1.5 block text-xs font-medium tracking-wide text-aer-300"
                  >
                    Team size
                  </label>
                  <select
                    id="book-team"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-aer-700 bg-aer-950 px-3.5 py-2.5 text-sm text-aer-100 transition-colors focus:border-accent-500 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    {TEAM_SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pain point */}
              <div>
                <label
                  htmlFor="book-pain"
                  className="mb-1.5 block text-xs font-medium tracking-wide text-aer-300"
                >
                  What would you like to automate?
                </label>
                <textarea
                  id="book-pain"
                  rows={3}
                  value={painPoint}
                  onChange={(e) => setPainPoint(e.target.value)}
                  placeholder="e.g., We spend 10 hours/week copying data from our CRM into spreadsheets for reporting..."
                  className="w-full resize-none rounded-lg border border-aer-700 bg-aer-950 px-3.5 py-2.5 text-sm text-aer-100 placeholder:text-aer-500 transition-colors focus:border-accent-500 focus:outline-none"
                />
              </div>

              {/* Error */}
              {formState === "error" && (
                <p className="text-sm text-red-400">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full rounded-full bg-accent-500 py-3 text-sm font-medium text-aer-950 transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {formState === "submitting"
                  ? "Sending..."
                  : "Submit Request"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
