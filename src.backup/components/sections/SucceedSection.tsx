import { ArrowRight, Users, FlaskConical, ShieldCheck, BookOpen } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const features = [
  {
    icon: Users,
    title: 'Join a community of researchers',
    description: 'Connect with fellow peptide enthusiasts, share insights, and get real-time support from people who understand your journey. Every purchase comes with access to our growing community.',
    cta: 'Join Our Community',
  },
  {
    icon: FlaskConical,
    title: 'Lab-grade quality meets research-friendly pricing',
    description: "Every compound is independently third-party tested for purity and identity. We've built a pricing structure that doesn't make you choose between quality and budget.",
    cta: 'Shop Peptides',
  },
  {
    icon: ShieldCheck,
    title: 'Confidence in every order',
    description: 'Not satisfied? Reach out to our team. Every order is processed with care and protected against issues in transit. Your satisfaction is our priority.',
    cta: 'Shop With Confidence',
  },
  {
    icon: BookOpen,
    title: 'Research resources at your fingertips',
    description: 'Access our protocol guides, dosage calculators, and lab reports. Stay informed with comprehensive documentation covering every compound we offer.',
    cta: 'Explore Protocols',
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
              <div className="relative bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 hover:shadow-card transition-shadow duration-300 h-full flex flex-col overflow-hidden">
                <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 flex-1">{feature.description}</p>
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 w-fit"
                >
                  {feature.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <div className="absolute bottom-4 right-4 opacity-[0.06] pointer-events-none">
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
