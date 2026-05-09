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

        <div className="space-y-14">
          {aboutContent.sections.map((section, si) => (
            <ScrollReveal key={si}>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-primary mb-5">
                  {section.heading}
                </h3>
                <div className="space-y-5 text-muted-foreground leading-relaxed text-base lg:text-lg">
                  {section.paragraphs.map((p, pi) => (
                    <p key={pi}>{p}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://drive.google.com/file/d/12Ml1N1a_JeQrsxQ3M5ez4Sg2gzQN5gKA/preview"
                className="w-full h-full"
                allow="autoplay"
                allowFullScreen
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
