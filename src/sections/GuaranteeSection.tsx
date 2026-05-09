import { Check, Truck, FlaskConical } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const guarantees = [
  {
    icon: Check,
    title: '99% Purity Guaranteed',
    subtitle: 'Or your money back',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: Truck,
    title: 'Speedy Delivery and Fulfillment',
    subtitle: 'Super fast shipping',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Check,
    title: '99%+ Purity',
    subtitle: 'Verified by HPLC',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: Truck,
    title: 'Speedy Delivery and Fulfillment',
    subtitle: 'Super fast shipping',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: FlaskConical,
    title: 'Testing for Heavy Metals Endotoxins and Sterility',
    subtitle: 'Third Party tested in America',
    color: 'bg-amber-100 text-amber-600',
  },
];

export default function GuaranteeSection() {
  return (
    <section className="w-full">
      <div className="grid lg:grid-cols-2">
        {/* Left - Dark with vials */}
        <div className="bg-primary-dark flex items-center justify-center p-8 lg:p-12 min-h-[400px] lg:min-h-[500px]">
          <ScrollReveal>
            <img
              src="/images/guarantee-vials.png"
              alt="Guarantee Vials"
              className="max-w-full h-auto object-contain max-h-[350px]"
            />
          </ScrollReveal>
        </div>

        {/* Right - Content */}
        <div className="bg-white flex flex-col justify-center p-8 lg:p-12">
          <ScrollReveal>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3">
              The TheAmineProtocolPH Guarantee
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
