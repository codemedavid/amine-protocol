import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, FlaskConical, HelpCircle, Truck, Calculator, Shield } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`
        sticky top-0 z-50 transition-all duration-500
        ${scrolled
          ? 'bg-charcoal-900/95 backdrop-blur-xl shadow-lg border-b border-charcoal-700/50'
          : 'bg-transparent border-b border-transparent'
        }
      `}>
        {/* Subtle gold accent line at very top */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

        <div className="container mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <button
              onClick={() => { onMenuClick(); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 hover:opacity-90 transition-all group"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gold-400/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                  src="/logo.jpeg?v=3"
                  alt="The Amine Protocol"
                  className="relative h-10 sm:h-12 w-auto object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-heading font-bold text-gradient-gold leading-tight">
                  The Amine Protocol
                </span>
                <span className="text-[9px] font-semibold tracking-[0.2em] text-charcoal-400 uppercase hidden sm:block">
                  Premium Peptide Science
                </span>
              </div>
            </button>

            {/* Right Side Navigation */}
            <div className="flex items-center gap-2 md:gap-4 ml-auto">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-0.5">
                {[
                  { label: 'Products', icon: FlaskConical, onClick: onMenuClick },
                  { label: 'Calculator', icon: Calculator, href: '/calculator' },
                  { label: 'Protocols', icon: FlaskConical, href: '/protocols' },
                  { label: 'Track', icon: Truck, href: '/track-order' },
                  { label: 'FAQ', icon: HelpCircle, href: '/faq' },
                  { label: 'Lab Reports', icon: Shield, href: '/coa' },
                ].map((item, i) => {
                  const inner = (
                    <>
                      <item.icon className="w-3.5 h-3.5" />
                      {item.label}
                    </>
                  );
                  const cls = "text-sm font-medium text-charcoal-300 hover:text-gold-400 px-3 py-2 rounded-lg transition-all flex items-center gap-2 hover:bg-white/5";
                  return item.onClick ? (
                    <button key={i} onClick={item.onClick} className={cls}>{inner}</button>
                  ) : (
                    <a key={i} href={item.href} className={cls}>{inner}</a>
                  );
                })}
              </nav>

              {/* Cart Button */}
              <button
                onClick={onCartClick}
                className="relative p-2.5 text-charcoal-200 hover:text-gold-400 hover:bg-white/5 rounded-xl transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal-900 text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-glow-gold">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 text-charcoal-200 hover:bg-white/5 rounded-xl transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-charcoal-900/80 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div
            className="absolute top-0 right-0 bottom-0 w-[300px] bg-charcoal-800/95 backdrop-blur-xl shadow-2xl border-l border-charcoal-700/50 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-charcoal-700/50">
              <div className="flex items-center gap-3">
                <img src="/logo.jpeg?v=3" alt="The Amine Protocol" className="h-8 w-auto object-contain rounded-md" />
                <span className="text-lg font-heading font-bold text-gradient-gold">
                  The Amine Protocol
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-charcoal-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col space-y-1">
                {[
                  { label: 'Products', icon: FlaskConical, onClick: () => { onMenuClick(); setMobileMenuOpen(false); } },
                  { label: 'Calculator', icon: Calculator, href: '/calculator' },
                  { label: 'Protocols', icon: FlaskConical, href: '/protocols' },
                  { label: 'Track Order', icon: Truck, href: '/track-order' },
                  { label: 'FAQ', icon: HelpCircle, href: '/faq' },
                  { label: 'Lab Reports', icon: Shield, href: '/coa' },
                ].map((item, i) => {
                  const inner = (
                    <>
                      <div className="p-2 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400">
                        <item.icon className="w-[18px] h-[18px]" />
                      </div>
                      {item.label}
                    </>
                  );
                  const cls = "flex items-center gap-3 p-4 rounded-xl text-left font-medium text-gray-200 hover:bg-white/5 hover:text-gold-400 transition-all";
                  return item.onClick ? (
                    <button key={i} onClick={item.onClick} className={cls}>{inner}</button>
                  ) : (
                    <a key={i} href={item.href} className={cls}>{inner}</a>
                  );
                })}
              </div>
            </nav>

            {/* Mobile drawer bottom accent */}
            <div className="p-4 border-t border-charcoal-700/50">
              <div className="text-center text-[10px] text-charcoal-500 tracking-widest uppercase">Premium Peptide Science</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
