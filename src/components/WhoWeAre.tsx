import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface WhoWeAreContent {
  title: string;
  paragraph: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  imageAlt: string;
}

const defaultContent: WhoWeAreContent = {
  title: 'WELCOME TO THE AMINE PROTOCOL',
  paragraph:
    'Founded on a simple but uncompromising principle: research materials should meet the highest possible standards — without shortcuts, ambiguity, or inflated claims. From day one, our focus has been delivering premium-grade peptides paired with transparent science and exceptional service. What began as a small, precision-driven operation has grown into a trusted name within the research community.',
  buttonText: 'WHO WE ARE',
  buttonLink: '/about',
  imageUrl: '/logo.jpeg',
  imageAlt: 'The Amine Protocol product',
};

interface WhoWeAreProps {
  content?: Partial<WhoWeAreContent>;
  onCtaClick?: () => void;
}

const WhoWeAre: React.FC<WhoWeAreProps> = ({ content, onCtaClick }) => {
  const data: WhoWeAreContent = { ...defaultContent, ...content };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    }
  };

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        ['--wwa-bg' as string]: '#FFFFFF',
        ['--wwa-heading' as string]: '#17374B',
        ['--wwa-text' as string]: '#4A5A6B',
        ['--wwa-accent' as string]: '#17374B',
        ['--wwa-accent-hover' as string]: '#1F4A63',
        background: 'var(--wwa-bg)',
      }}
    >
      <div className="container mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div className="order-1">
            <h2
              className="font-heading font-bold tracking-tight uppercase text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] mb-7"
              style={{ color: 'var(--wwa-heading)' }}
            >
              {data.title}
            </h2>

            <p
              className="text-base sm:text-lg leading-[1.75] mb-9 max-w-xl"
              style={{ color: 'var(--wwa-text)' }}
            >
              {data.paragraph}
            </p>

            <a
              href={data.buttonLink}
              onClick={handleClick}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-sm tracking-wider uppercase text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'var(--wwa-accent)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--wwa-accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--wwa-accent)')}
            >
              <span>{data.buttonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right: Teal Card with Hero-style circular logo inside */}
          <div className="order-2 flex justify-center md:justify-end">
            <div
              className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden"
              style={{
                boxShadow:
                  '0 20px 50px -15px rgba(23, 55, 75, 0.35), 0 8px 20px -5px rgba(23, 55, 75, 0.2)',
                background:
                  'linear-gradient(135deg, #1a3d52 0%, #2a5770 50%, #1a3d52 100%)',
              }}
            >
              {/* Molecular pattern overlay */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="wwa-molecules"
                    x="0"
                    y="0"
                    width="120"
                    height="120"
                    patternUnits="userSpaceOnUse"
                  >
                    <polygon
                      points="30,10 45,18 45,34 30,42 15,34 15,18"
                      fill="none"
                      stroke="#7fb8d4"
                      strokeWidth="0.6"
                    />
                    <line x1="45" y1="18" x2="60" y2="10" stroke="#7fb8d4" strokeWidth="0.5" />
                    <line x1="15" y1="18" x2="0" y2="10" stroke="#7fb8d4" strokeWidth="0.5" />
                    <circle cx="30" cy="10" r="1.8" fill="#9fd0e6" />
                    <circle cx="45" cy="34" r="1.5" fill="#9fd0e6" opacity="0.7" />
                    <circle cx="15" cy="34" r="1.5" fill="#9fd0e6" opacity="0.7" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#wwa-molecules)" />
              </svg>

              {/* Soft radial glow behind logo */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(127,184,212,0.3) 0%, transparent 65%)',
                }}
              />

              {/* Hero-style circular logo (floating with aura + glow) */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="relative flex items-center justify-center animate-float w-full h-full">
                  {/* Outer glowing aura ring */}
                  <div
                    className="absolute inset-[2%] rounded-full animate-spin-slow"
                    style={{
                      background:
                        'conic-gradient(from 0deg, transparent 0%, rgba(100,160,220,0.25) 15%, transparent 30%, rgba(140,190,240,0.2) 45%, transparent 60%, rgba(100,160,220,0.15) 75%, transparent 90%)',
                      filter: 'blur(16px)',
                    }}
                  />

                  {/* Inner soft glow sphere */}
                  <div
                    className="absolute inset-[6%] rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle at 35% 30%, rgba(180,210,240,0.35) 0%, rgba(140,180,220,0.18) 40%, transparent 70%)',
                      animation: 'glow-pulse 4s ease-in-out infinite',
                    }}
                  />

                  {/* Glass sphere border */}
                  <div
                    className="absolute inset-[9%] rounded-full"
                    style={{
                      border: '1.5px solid rgba(180,210,240,0.3)',
                      boxShadow:
                        '0 0 40px rgba(100,160,220,0.15), 0 0 80px rgba(100,160,220,0.08), inset 0 0 40px rgba(180,210,240,0.12)',
                    }}
                  />

                  {/* Circular logo badge */}
                  <div
                    className="relative w-[82%] h-[82%] rounded-full flex items-center justify-center overflow-hidden"
                    style={{
                      boxShadow:
                        '0 8px 40px rgba(30,60,100,0.4), 0 0 60px rgba(80,140,210,0.2)',
                    }}
                  >
                    <img
                      src={data.imageUrl}
                      alt={data.imageAlt}
                      className="w-[115%] h-[115%] object-cover scale-[1.15]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
