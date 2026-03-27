const ITEMS = [
  "Ecommerce Automation",
  "Financial Operations",
  "Customer Support",
  "Data Processing",
  "Workflow Design",
  "Report Generation",
  "Inventory Management",
  "Lead Qualification",
] as const;

function TickerItem({ label }: { label: string }) {
  return (
    <>
      <span className="text-aer-400">{label}</span>
      <span className="text-accent-500" aria-hidden="true">
        ◆
      </span>
    </>
  );
}

export default function SocialProofBar() {
  return (
    <div
      className="border-y border-aer-800 bg-aer-950 py-4 overflow-hidden"
      aria-label="Services ticker"
    >
      <div className="ticker-scroll flex w-max items-center gap-6 whitespace-nowrap text-xs uppercase tracking-widest">
        {/* First set */}
        {ITEMS.map((item) => (
          <TickerItem key={item} label={item} />
        ))}
        {/* Duplicate for seamless loop */}
        {ITEMS.map((item) => (
          <TickerItem key={`dup-${item}`} label={item} />
        ))}
      </div>
    </div>
  );
}
