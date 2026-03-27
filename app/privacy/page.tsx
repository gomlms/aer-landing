import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Aer",
};

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-32 pb-24 lg:px-8">
      <a
        href="/"
        className="font-display text-sm font-medium text-accent-500 transition-opacity hover:opacity-80"
      >
        &larr; Back to home
      </a>

      <h1 className="mt-8 font-display text-3xl font-bold text-aer-50 lg:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-aer-400">
        Last updated: March 27, 2026
      </p>

      <div className="mt-12 space-y-10 text-base leading-relaxed text-aer-200">
        {/* Intro */}
        <section>
          <p>
            Aer (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
            operates the website located at this domain. This Privacy Policy
            explains how we collect, use, and protect your information when you
            visit our website or use our services.
          </p>
        </section>

        {/* Information We Collect */}
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-aer-50">
            Information We Collect
          </h2>
          <p className="mb-3">
            We may collect the following types of information:
          </p>
          <ul className="list-inside list-disc space-y-2 text-aer-300">
            <li>
              <strong className="text-aer-100">Information you provide:</strong>{" "}
              When you fill out our booking form, we collect your name, company
              name, email address, industry, team size, and a description of
              what you&apos;d like to automate.
            </li>
            <li>
              <strong className="text-aer-100">
                Automatically collected information:
              </strong>{" "}
              We collect standard usage data such as your IP address, browser
              type, device information, pages visited, and referring URLs
              through analytics tools.
            </li>
            <li>
              <strong className="text-aer-100">
                Cookies and tracking technologies:
              </strong>{" "}
              We use cookies and similar technologies as described below.
            </li>
          </ul>
        </section>

        {/* Cookies and Tracking */}
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-aer-50">
            Cookies and Tracking Technologies
          </h2>
          <p className="mb-3">
            When you visit or log in to our website, cookies and similar
            technologies may be used by our online data partners or vendors to
            associate these activities with other personal information they or
            others have about you, including by association with your email
            address. We (or service providers on our behalf) may then send
            communications and marketing to these email addresses. You may opt
            out of receiving this advertising by visiting{" "}
            <a
              href="https://app.retention.com/optout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-400 underline underline-offset-2 transition-colors hover:text-accent-300"
            >
              https://app.retention.com/optout
            </a>
            .
          </p>
          <p>
            You also have the option to opt out of the collection of your
            personal data in compliance with GDPR by visiting{" "}
            <a
              href="https://www.rb2b.com/rb2b-gdpr-opt-out"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-400 underline underline-offset-2 transition-colors hover:text-accent-300"
            >
              https://www.rb2b.com/rb2b-gdpr-opt-out
            </a>
            .
          </p>
        </section>

        {/* How We Use Your Information */}
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-aer-50">
            How We Use Your Information
          </h2>
          <ul className="list-inside list-disc space-y-2 text-aer-300">
            <li>To respond to your inquiries and schedule strategy calls</li>
            <li>To understand how visitors use our website and improve it</li>
            <li>To send relevant communications about our services</li>
            <li>To identify potential customers and personalize outreach</li>
          </ul>
        </section>

        {/* Analytics */}
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-aer-50">
            Analytics
          </h2>
          <p>
            We use Vercel Analytics to collect anonymized usage data about how
            visitors interact with our website. This helps us understand traffic
            patterns and improve the user experience. Vercel Analytics does not
            use cookies and does not collect personally identifiable information.
          </p>
        </section>

        {/* Third-Party Services */}
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-aer-50">
            Third-Party Services
          </h2>
          <p>
            We use the following third-party services that may collect or process
            data:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2 text-aer-300">
            <li>
              <strong className="text-aer-100">Vercel</strong> &mdash; Hosting
              and analytics
            </li>
            <li>
              <strong className="text-aer-100">RB2B</strong> &mdash; Visitor
              identification for business development purposes
            </li>
            <li>
              <strong className="text-aer-100">Slack</strong> &mdash; Internal
              notification delivery for form submissions
            </li>
          </ul>
        </section>

        {/* Data Retention */}
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-aer-50">
            Data Retention
          </h2>
          <p>
            We retain your personal information only for as long as necessary to
            fulfill the purposes outlined in this policy, or as required by law.
            Form submission data is retained for the duration of our business
            relationship and for a reasonable period afterward.
          </p>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-aer-50">
            Your Rights
          </h2>
          <p className="mb-3">
            Depending on your jurisdiction, you may have the right to:
          </p>
          <ul className="list-inside list-disc space-y-2 text-aer-300">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Opt out of marketing communications</li>
            <li>Opt out of the sale or sharing of your personal information</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, contact us at{" "}
            <a
              href="mailto:hello@aeragency.com"
              className="text-accent-400 underline underline-offset-2 transition-colors hover:text-accent-300"
            >
              hello@aeragency.com
            </a>
            .
          </p>
        </section>

        {/* Changes */}
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-aer-50">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated &ldquo;Last updated&rdquo; date.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-aer-50">
            Contact Us
          </h2>
          <p>
            If you have questions about this Privacy Policy, contact us at{" "}
            <a
              href="mailto:hello@aeragency.com"
              className="text-accent-400 underline underline-offset-2 transition-colors hover:text-accent-300"
            >
              hello@aeragency.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
