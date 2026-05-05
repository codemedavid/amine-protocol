import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Zap, Dna, Atom, ShieldCheck } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    const anim = gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix;
      },
    });
    return () => { anim.kill(); };
  }, [target, suffix]);

  return (
    <div className="flex flex-col">
      <span ref={ref} className="text-4xl lg:text-5xl font-bold text-primary">0{suffix}</span>
      <span className="text-xs text-muted-foreground mt-1">{label}</span>
    </div>
  );
}

const tags = [
  { icon: Zap, label: 'Potency' },
  { icon: Dna, label: 'Purity' },
  { icon: Atom, label: 'Heavy Metals' },
  { icon: ShieldCheck, label: 'Sterility' },
];

export default function QualitySection() {
  return (
    <section className="w-full py-16 lg:py-24 bg-white" id="quality">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <ScrollReveal>
              <h2 className="text-3xl lg:text-[2.75rem] font-bold text-primary leading-tight mb-4">
                Quality you can verify, not just trust
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                Every batch is independently tested by accredited laboratories. We don't ask you to take our word for it—we give you the proof.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="flex items-center gap-6 lg:gap-10 mb-8">
                <AnimatedCounter target={99} suffix="%+" label="Purity Guaranteed" />
                <div className="w-px h-12 bg-gray-200" />
                <AnimatedCounter target={6} suffix="" label="Quality Checks" />
                <div className="w-px h-12 bg-gray-200" />
                <AnimatedCounter target={100} suffix="%" label="Lab Verified" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-3 mb-8">
                {tags.map((tag) => (
                  <span
                    key={tag.label}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent-light border border-accent text-sm font-medium text-primary"
                  >
                    <tag.icon className="w-4 h-4 text-secondary" />
                    {tag.label}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
                <h4 className="font-semibold text-primary mb-2">Verified Potency</h4>
                <p className="text-sm text-muted-foreground">
                  Every vial is tested to confirm it contains exactly what the label says. We go through 6 quality checks per batch.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <ScrollReveal delay={0.2}>
              <div className="relative bg-gradient-to-br from-accent-light to-accent rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
                {/* Decorative circles */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full border border-secondary/20"
                      style={{
                        width: `${80 + i * 40}px`,
                        height: `${80 + i * 40}px`,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: 0.3 - i * 0.05,
                      }}
                    />
                  ))}
                </div>

                {/* Center content */}
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-card flex items-center justify-center mb-4">
                    <svg viewBox="0 0 48 48" className="w-12 h-12 text-secondary" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 4v14L8 36a3 3 0 0 0 2.7 4.4h26.6A3 3 0 0 0 40 36L30 18V4" />
                      <line x1="16" y1="4" x2="32" y2="4" />
                    </svg>
                  </div>
                  <p className="text-primary font-bold text-2xl">≥99%</p>
                  <p className="text-muted-foreground text-sm">Purity Standard</p>
                </div>

                {/* Purity Badge */}
                <div className="absolute top-6 right-6 bg-white rounded-lg px-3 py-2 shadow-card flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg viewBox="0 0 16 16" className="w-3 h-3 text-emerald-500" fill="currentColor">
                      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.5 6.5L7 11l-2.5-2.5 1-1L7 9l3.5-3.5 1 1z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary">≥99% Purity</p>
                    <p className="text-[10px] text-muted-foreground">Verified by HPLC</p>
                  </div>
                </div>

                {/* See Proof Link */}
                <a
                  href="/coa"
                  className="absolute bottom-6 left-6 right-6 bg-white rounded-lg px-4 py-3 shadow-card flex items-center justify-between group hover:shadow-card-hover transition-shadow"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-primary">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                    View Lab Reports
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
