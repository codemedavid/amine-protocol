import { FlaskConical, Microscope, FileText } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const processes = [
  {
    icon: FlaskConical,
    title: 'Controlled Synthesis',
    description: 'Compounds are produced in monitored laboratory environments following strict procedural and environmental standards to ensure batch consistency.',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    icon: Microscope,
    title: 'Independent Testing',
    description: 'Every batch is submitted to accredited third-party laboratories for purity, identity, and composition analysis before distribution.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: FileText,
    title: 'Documented Distribution',
    description: 'Full batch traceability is maintained from synthesis through fulfillment, with COA documentation available for every product.',
    color: 'bg-emerald-100 text-emerald-600',
  },
];

export default function ProductionSection() {
  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Title */}
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-sm font-medium text-secondary">Production & Verification Process</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Each compound is synthesized under controlled environmental standards and verified through independent third-party testing.
              </p>
            </div>
          </ScrollReveal>

          {/* Lab Image */}
          <ScrollReveal delay={0.1} direction="left">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/images/lab-microscope.jpg"
                alt="Laboratory Microscope"
                className="w-full h-64 lg:h-72 object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {processes.map((process, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-card transition-shadow duration-300 h-full">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${process.color}`}>
                  <process.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold text-primary mb-2">{process.title}</h4>
                <p className="text-sm text-muted-foreground">{process.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
