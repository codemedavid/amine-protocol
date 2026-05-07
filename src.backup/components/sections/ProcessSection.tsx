import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const steps = [
  {
    number: '01',
    title: 'Browse Compounds',
    description: 'Explore the compound catalog and review detailed specifications, research information, and batch availability.',
  },
  {
    number: '02',
    title: 'Verify COA Documentation',
    description: 'Access batch-specific Certificates of Analysis to confirm third-party testing, purity percentage, and analytical validation.',
  },
  {
    number: '03',
    title: 'Secure Checkout',
    description: 'Complete your order through our secure checkout system with multiple payment options.',
  },
  {
    number: '04',
    title: 'Controlled Fulfillment',
    description: 'Compounds are packaged and shipped under documented handling standards with full batch traceability.',
  },
];

interface ProcessSectionProps {
  onShopAll?: () => void;
}

export default function ProcessSection({ onShopAll }: ProcessSectionProps) {
  return (
    <section className="w-full py-16 lg:py-24 bg-primary" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl lg:text-[2.75rem] font-bold text-white leading-tight mb-10 max-w-md">
            <span className="text-secondary">Effortless Process,</span><br />
            Continuous Supply
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300 h-full">
                <span className="absolute top-4 right-4 text-3xl font-bold text-white/20">
                  {step.number}
                </span>
                <h4 className="text-lg font-semibold text-white mb-3 mt-4">{step.title}</h4>
                <p className="text-sm text-white/60">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-primary bg-gradient-to-br from-secondary to-primary-light flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-white/80 text-sm">
                Trusted by <span className="text-white font-semibold">researchers</span> everywhere
              </p>
            </div>
            <button
              onClick={onShopAll}
              className="group inline-flex items-center gap-3 bg-secondary hover:bg-secondary-light text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 animate-pulse-glow"
            >
              Shop Peptides
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
