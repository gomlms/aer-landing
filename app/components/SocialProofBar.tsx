const ITEMS = [
  "Ecommerce Automation",
  "Financial Operations",
  "Customer Support",
  "Data Entry Automation",
  "Document Processing",
  "Approval Workflows",
  "Pipeline Analytics",
  "Expense Categorization",
  "Financial Forecasting",
  "Ticket Triage",
  "Onboarding Flows",
  "Data Enrichment",
  "Anomaly Detection",
  "Employee Onboarding",
  "Knowledge Base Updates",
  "Workflow Design",
  "Report Generation",
  "Inventory Management",
  "Lead Qualification",
  "Data Processing",
] as const;

function TickerSet() {
  return (
    <>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-6">
          <span className="text-aer-400">{item}</span>
          <span className="text-accent-500" aria-hidden="true">
            ◆
          </span>
        </span>
      ))}
    </>
  );
}

export default function SocialProofBar() {
  return (
    <div
      className="border-y border-aer-800 bg-aer-950 py-4 overflow-hidden"
      aria-label="Services ticker"
    >
      <div className="ticker-scroll flex items-center gap-6 whitespace-nowrap text-xs uppercase tracking-widest">
        <TickerSet />
        <TickerSet />
        <TickerSet />
        <TickerSet />
      </div>
    </div>
  );
}
