import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Shield } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(badgeRef.current, { y: 20, opacity: 0, duration: 0.5 })
        .from(headingRef.current, { y: 40, opacity: 0, duration: 0.7 }, '-=0.3')
        .from(subtextRef.current, { y: 20, opacity: 0, duration: 0.5 }, '-=0.4')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from(socialRef.current, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from(imageRef.current, { scale: 0.95, opacity: 0, duration: 0.8 }, '-=0.6');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            <div ref={badgeRef} className="inline-flex items-center gap-2 bg-accent-light border border-accent rounded-full px-4 py-2 w-fit">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-primary">6X testing for all batches after April 2026</span>
            </div>

            <h1 ref={headingRef} className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-primary leading-[1.1] tracking-tight">
              Precision Synthesized for Advanced Research
            </h1>

            <p ref={subtextRef} className="text-lg text-muted-foreground max-w-lg">
              Transparent sourcing. Documented purity. Secure distribution.
            </p>

            <div ref={ctaRef}>
              <a
                href="#shop"
                className="group inline-flex items-center gap-3 bg-secondary hover:bg-secondary-dark text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30"
              >
                Buy Peptides
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>

            <div ref={socialRef} className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-secondary/80 to-primary/80 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span className="font-medium text-primary">10000+</span> Satisfied Customers
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div ref={imageRef} className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <img
                src="/images/hero-vials.png"
                alt="TheAmineProtocolPH Peptide Vials"
                className="w-full h-auto object-contain animate-float"
              />
              {/* Feature checklist overlay */}
              <div className="absolute top-4 right-0 lg:right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-card border border-gray-100 max-w-[220px]">
                <div className="flex flex-col gap-2.5">
                  {[
                    'Batch-Level COA Transparency',
                    'Secure & Traceable Distribution',
                    'Documentation-First Framework',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <svg viewBox="0 0 16 16" className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.5 6.5L7 11l-2.5-2.5 1-1L7 9l3.5-3.5 1 1z" />
                      </svg>
                      <span className="text-primary font-medium text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
