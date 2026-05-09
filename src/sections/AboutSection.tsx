import ScrollReveal from '@/components/ScrollReveal';
import { aboutContent } from '@/lib/siteContent';

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-16 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-secondary mb-3">
              {aboutContent.eyebrow}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              {aboutContent.heading}
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="space-y-5 text-muted-foreground leading-relaxed text-base lg:text-lg">
            {aboutContent.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
