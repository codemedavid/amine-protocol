import { Package, FlaskConical, Lock } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const stats = [
  {
    icon: Package,
    number: '75,000+',
    title: 'Orders Fulfilled',
    description: 'Trusted by a growing network of researchers, laboratories, and repeat customers worldwide.',
  },
  {
    icon: FlaskConical,
    number: '3+',
    title: 'Years Expertise',
    description: "We've spent years working within this space, refining our processes and maintaining a consistent, reliable.",
  },
  {
    icon: Lock,
    number: 'Secure',
    title: 'Secure Access',
    description: 'Our members-only platform ensures secure login, protected data, and exclusive product access.',
  },
];

export default function WhyChooseSection() {
  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3">
              Why Choose TheAmineProtocolPH
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built on controlled production standards, third-party validation, and batch-level traceability.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-full bg-accent-light flex items-center justify-center mb-5">
                  <stat.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-1">{stat.number}</h3>
                <h4 className="text-lg font-semibold text-primary mb-2">{stat.title}</h4>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
