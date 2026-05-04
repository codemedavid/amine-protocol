import React from 'react';
import { HelpCircle, MapPin, Truck, FlaskConical, Shield, Atom } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-charcoal-900 pt-20 pb-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hex-pattern opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold-400/3 rounded-full blur-[100px]" />

      {/* Top gold gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">

          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start gap-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-2 bg-brand-500/10 rounded-xl blur-md" />
                <img
                  src="/logo.jpeg?v=3"
                  alt="The Amine Protocol"
                  className="relative h-16 w-auto object-contain rounded-xl"
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-gradient-gold text-lg">The Amine Protocol</h3>
                <p className="text-[10px] tracking-[0.2em] text-charcoal-400 uppercase">Premium Peptide Science</p>
              </div>
            </div>
            <p className="text-charcoal-400 text-sm max-w-xs text-center md:text-left leading-relaxed">
              Quality peptides for your wellness journey. Lab-tested, high-purity formulations you can trust.
            </p>
            {/* Molecular formula accent */}
            <div className="flex items-center gap-2 text-[10px] font-mono text-charcoal-500">
              <Atom className="w-3 h-3 text-brand-500/50" />
              <span>NH₂-R-COOH</span>
              <span className="text-charcoal-700">|</span>
              <span>Research Grade</span>
            </div>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-gold-400 font-heading font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
              <div className="w-8 h-px bg-gradient-to-r from-gold-400/50 to-transparent" />
              Contact Us
            </h3>

            <a
              href="mailto:babestudio259@gmail.com"
              className="text-charcoal-300 hover:text-gold-400 transition-all flex items-center gap-3 text-sm group"
            >
              <div className="p-1.5 rounded-md bg-brand-500/10 border border-brand-500/20 group-hover:border-gold-400/30 transition-colors">
                <svg className="w-3.5 h-3.5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              babestudio259@gmail.com
            </a>

            <a
              href="tel:+639496133242"
              className="text-charcoal-300 hover:text-gold-400 transition-all flex items-center gap-3 text-sm group"
            >
              <div className="p-1.5 rounded-md bg-brand-500/10 border border-brand-500/20 group-hover:border-gold-400/30 transition-colors">
                <svg className="w-3.5 h-3.5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              0949 613 3242
            </a>

            <div className="text-charcoal-300 flex items-center gap-3 text-sm mt-1">
              <div className="p-1.5 rounded-md bg-brand-500/10 border border-brand-500/20">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
              </div>
              General Trias, Cavite
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-gold-400 font-heading font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
              <div className="w-8 h-px bg-gradient-to-r from-gold-400/50 to-transparent" />
              Quick Links
            </h3>
            {[
              { icon: FlaskConical, label: 'Products', href: '#' },
              { icon: Truck, label: 'Track Order', href: '/track-order' },
              { icon: HelpCircle, label: 'FAQ', href: '/faq' },
              { icon: Shield, label: 'Lab Reports', href: '/coa' },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="text-charcoal-300 hover:text-gold-400 transition-all flex items-center gap-3 text-sm group"
              >
                <div className="p-1.5 rounded-md bg-brand-500/10 border border-brand-500/20 group-hover:border-gold-400/30 transition-colors">
                  <item.icon className="w-3.5 h-3.5 text-brand-400" />
                </div>
                {item.label}
              </a>
            ))}
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-charcoal-700 to-transparent mb-6" />

        {/* Footer Bottom */}
        <div className="text-center">
          <p className="text-xs text-charcoal-500">
            &copy; {currentYear} The Amine Protocol. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
