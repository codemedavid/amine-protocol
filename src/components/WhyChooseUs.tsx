import React from 'react';
import { FlaskConical, DollarSign, Clock, Lock, type LucideIcon } from 'lucide-react';

export interface WhyChooseFeature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface WhyChooseContent {
  title: string;
  features: WhyChooseFeature[];
}

const defaultContent: WhyChooseContent = {
  title: 'WHY CHOOSE THE AMINE PROTOCOL',
  features: [
    {
      id: 'high-purity',
      icon: FlaskConical,
      title: 'HIGH PURITY',
      description:
        'Every batch is produced using high-quality raw materials and strict synthesis protocols to ensure exceptional purity and consistency. Our peptides are designed to meet the rigorous standards required for advanced research applications.',
    },
    {
      id: 'cost-efficiency',
      icon: DollarSign,
      title: 'COST EFFICIENCY',
      description:
        'By sourcing premium raw materials and optimizing our production process, we deliver high-quality research peptides at competitive prices — helping laboratories and researchers maximize results without unnecessary cost.',
    },
    {
      id: 'verified-quality',
      icon: Clock,
      title: 'VERIFIED QUALITY',
      description:
        'Every product is supported by independent third-party testing and a published Certificate of Analysis. We verify purity, identity, and consistency so you can trust what you receive.',
    },
    {
      id: 'secure-access',
      icon: Lock,
      title: 'SECURE MEMBER ACCESS',
      description:
        'Our members-only platform protects your privacy and ensures a discreet, secure experience. Access exclusive products, pricing, and protocols in a safe research environment.',
    },
  ],
};

interface WhyChooseUsProps {
  content?: Partial<WhyChooseContent>;
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ content }) => {
  const data: WhyChooseContent = {
    title: content?.title ?? defaultContent.title,
    features: content?.features ?? defaultContent.features,
  };

  return (
    <section
      className="relative py-20 md:py-28"
      style={{
        ['--wcu-bg' as string]: '#FFFFFF',
        ['--wcu-heading' as string]: '#17374B',
        ['--wcu-title' as string]: '#17374B',
        ['--wcu-text' as string]: '#4A5A6B',
        ['--wcu-icon-bg' as string]: '#17374B',
        ['--wcu-icon-color' as string]: '#FFFFFF',
        background: 'var(--wcu-bg)',
      }}
    >
      <div className="container mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Title */}
        <h2
          className="font-heading font-bold tracking-tight uppercase text-center text-3xl sm:text-4xl lg:text-[2.5rem] leading-tight mb-14 md:mb-20"
          style={{ color: 'var(--wcu-heading)' }}
        >
          {data.title}
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-10">
          {data.features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1"
              >
                {/* Circular Icon */}
                <div
                  className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full mb-6 transition-all duration-300 group-hover:shadow-xl"
                  style={{
                    background: 'var(--wcu-icon-bg)',
                    boxShadow: '0 8px 20px -6px rgba(23, 55, 75, 0.35)',
                  }}
                >
                  <Icon
                    className="w-9 h-9 md:w-11 md:h-11"
                    strokeWidth={2}
                    style={{ color: 'var(--wcu-icon-color)' }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-heading font-bold uppercase tracking-wide text-base md:text-lg mb-3"
                  style={{ color: 'var(--wcu-title)' }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm md:text-[15px] leading-relaxed max-w-[260px]"
                  style={{ color: 'var(--wcu-text)' }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
