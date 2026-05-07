import { Phone, Mail } from 'lucide-react';

const quickLinks = ['Shop', 'About', 'Contact', 'FAQ'];
const legalLinks = ['Disclaimer', 'Privacy Policy', 'Shipping Policy', 'Terms & Conditions'];

const trustBadges = [
  { label: 'SSL Secured', icon: 'shield' },
  { label: 'Secure Checkout', icon: 'lock' },
  { label: 'Guaranteed Delivery', icon: 'truck' },
  { label: 'Manufacturer COA', icon: 'file' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 8 C12 8 8 16 8 20 C8 24 12 32 20 32 C28 32 32 24 32 20 C32 16 28 8 20 8Z" />
                  <path d="M14 14 C14 14 16 18 20 18 C24 18 26 14 26 14" />
                  <path d="M14 26 C14 26 16 22 20 22 C24 22 26 26 26 26" />
                  <line x1="20" y1="8" x2="20" y2="32" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-white tracking-wider leading-tight">NEXTGEN</p>
                <p className="text-xs font-bold text-white tracking-wider leading-tight">PEPTIDES</p>
              </div>
            </a>
            <p className="text-sm text-white/60 leading-relaxed">
              Precision synthesized compounds for advanced laboratory research. Transparent sourcing, documented purity, secure distribution.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-white/60 hover:text-white transition-colors relative group"
                  >
                    {link}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-200 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal & Compliance</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-white/60 hover:text-white transition-colors relative group"
                  >
                    {link}
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
                <a href="tel:+14243434462" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-secondary" />
                  +1 (424) 343-4462
                </a>
                <p className="text-xs text-white/40 ml-6">SMS Only: 8-5 CST</p>
              </li>
              <li>
                <a href="mailto:CS@NGpeptide.com" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-secondary" />
                  CS@NGpeptide.com
                </a>
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
                {badge.icon === 'file' && <g><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></g>}
              </svg>
              {badge.label}
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center pt-4 border-t border-white/10">
          <p className="text-sm text-white/40">
            @2026 Nextgen Peptides, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
