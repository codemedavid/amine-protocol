import { ArrowRight, Users, FlaskConical, ShieldCheck, BookOpen } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const features = [
  {
    icon: Users,
    title: 'Join a community of researchers',
    description: 'Every purchase unlocks access to our private Discord community. Connect with fellow peptide enthusiasts, share insights, and get real-time support from people who understand your journey.',
    cta: 'Join the Discord',
    illustration: 'molecules',
  },
  {
    icon: FlaskConical,
    title: 'Lab-grade quality meets research-friendly pricing',
    description: "Every compound is independently third-party tested for purity and identity. We've built a pricing structure that doesn't make you choose between quality and budget.",
    cta: 'Shop USA Tested Peptides',
    illustration: 'test-tubes',
  },
  {
    icon: ShieldCheck,
    title: '60-day money-back guarantee & free shipment protection',
    description: 'Not satisfied? We offer a full refund within 60 days on unused, unopened products. Every order is protected against damage or loss in transit.',
    cta: 'Shop With Confidence',
    illustration: 'shield',
  },
  {
    icon: BookOpen,
    title: 'Extensive research library at your fingertips',
    description: 'Access our comprehensive collection of research articles, studies, and educational resources. Stay informed with our regularly updated blog covering the latest peptide research and discoveries.',
    cta: 'Explore Research Library',
    illustration: 'books',
  },
];

export default function SucceedSection() {
  return (
    <section className="w-full py-16 lg:py-24 bg-gradient-to-b from-accent-light/70 via-accent-light/40 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3">
              Everything you<br />need to succeed
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5">
          {features.map((feature, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 hover:shadow-card transition-shadow duration-300 h-full flex flex-col">
                <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 flex-1">{feature.description}</p>
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 w-fit"
                >
                  {feature.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                {/* Decorative illustration */}
                <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none">
                  <feature.icon className="w-24 h-24" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
