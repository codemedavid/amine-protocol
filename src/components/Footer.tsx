import React from 'react';
import { Phone, Mail, MapPin, FlaskConical, HelpCircle, Truck, Shield } from 'lucide-react';

const trustBadges = [
  { label: 'SSL Secured', icon: 'shield' },
  { label: 'Secure Checkout', icon: 'lock' },
  { label: 'Guaranteed Delivery', icon: 'truck' },
  { label: 'COA Verified', icon: 'file' },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-4">
              <img
                src="/logo.jpeg?v=3"
                alt="The Amine Protocol"
                className="h-10 w-auto object-contain rounded-lg"
              />
              <div>
                <p className="text-xs font-bold text-white tracking-wider leading-tight">THE AMINE</p>
                <p className="text-xs font-bold text-white tracking-wider leading-tight">PROTOCOL</p>
              </div>
            </a>
            <p className="text-sm text-white/60 leading-relaxed">
              Quality peptides for your research journey. Lab-tested, high-purity formulations you can trust.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Products', icon: FlaskConical, onClick: true },
                { label: 'Protocols', icon: FlaskConical, href: '/protocols' },
                { label: 'Track Order', icon: Truck, href: '/track-order' },
                { label: 'FAQ', icon: HelpCircle, href: '/faq' },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href ?? '/'}
                    className="text-sm text-white/60 hover:text-white transition-colors relative group flex items-center gap-2"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-200 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Lab Reports (COA)', href: '/coa' },
                { label: 'Calculator', href: '/calculator' },
                { label: 'Research Protocols', href: '/protocols' },
                { label: 'FAQ', href: '/faq' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-200 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:babestudio259@gmail.com" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-secondary" />
                  babestudio259@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+639496133242" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-secondary" />
                  0949 613 3242
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <MapPin className="w-4 h-4 text-secondary" />
                  General Trias, Cavite
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10 py-8 border-t border-white/10 mb-8">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-sm text-white/60">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" strokeWidth="2">
                {badge.icon === 'shield' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                {badge.icon === 'lock' && <g><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></g>}
                {badge.icon === 'truck' && <g><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></g>}
                {badge.icon === 'file' && <g><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></g>}
              </svg>
              {badge.label}
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center pt-4 border-t border-white/10">
          <p className="text-sm text-white/40">
            &copy; {currentYear} The Amine Protocol. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
