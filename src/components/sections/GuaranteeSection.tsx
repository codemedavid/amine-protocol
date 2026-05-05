import { Check, Truck, FlaskConical } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const guarantees = [
  {
    icon: Check,
    title: '≥99% Purity Guaranteed',
    subtitle: 'Verified by HPLC testing',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: Truck,
    title: 'Fast Delivery & Fulfillment',
    subtitle: 'Reliable, tracked shipping',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Check,
    title: 'Third-Party Tested',
    subtitle: 'Independent lab verification',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: Truck,
    title: 'Secure Order Processing',
    subtitle: 'Protected checkout system',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: FlaskConical,
    title: 'Heavy Metals & Sterility Tested',
    subtitle: 'Comprehensive safety screening',
    color: 'bg-amber-100 text-amber-600',
  },
];

export default function GuaranteeSection() {
  return (
    <section className="w-full">
      <div className="grid lg:grid-cols-2">
        {/* Left - Dark with brand illustration */}
        <div className="bg-primary-dark flex items-center justify-center p-8 lg:p-12 min-h-[400px] lg:min-h-[500px]">
          <ScrollReveal>
            <div className="text-center text-white">
              <div className="w-24 h-24 mx-auto bg-white/10 rounded-3xl flex items-center justify-center mb-6">
                <svg viewBox="0 0 64 64" className="w-14 h-14 text-secondary" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M24 4v20L10 50a4 4 0 0 0 3.6 5.8h36.8A4 4 0 0 0 54 50L40 24V4" />
                  <line x1="22" y1="4" x2="42" y2="4" />
                  <circle cx="22" cy="42" r="3" fill="currentColor" opacity="0.4" />
                  <circle cx="36" cy="46" r="2" fill="currentColor" opacity="0.4" />
                  <circle cx="28" cy="50" r="2.5" fill="currentColor" opacity="0.4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Quality Assured</h3>
              <p className="text-white/60 text-sm max-w-xs">
                Every product we offer meets the highest standards for purity and safety.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Right - Content */}
        <div className="bg-white flex flex-col justify-center p-8 lg:p-12">
          <ScrollReveal>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3">
              The Amine Protocol Guarantee
            </h2>
            <p className="text-muted-foreground mb-8">
              We don't compromise on quality. Every product meets the highest standards.
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-3">
            {guarantees.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-card transition-shadow duration-300">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
