import { Shield, Truck, FlaskConical, FileCheck, BadgeCheck } from 'lucide-react';

const items = [
  { icon: BadgeCheck, text: '≥99% Purity' },
  { icon: Truck, text: 'Fast Shipping' },
  { icon: FlaskConical, text: 'Lab-Grade Quality' },
  { icon: FileCheck, text: 'COA With Every Product' },
  { icon: Shield, text: 'Third Party Verified' },
];

export default function AnnouncementBar() {
  const allItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-primary-dark text-white py-2.5 overflow-hidden relative z-50">
      <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
        {allItems.map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-6 shrink-0">
            <item.icon className="w-3.5 h-3.5 text-secondary" />
            <span className="text-[13px] font-medium">{item.text}</span>
            <span className="text-secondary/60 mx-2">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
