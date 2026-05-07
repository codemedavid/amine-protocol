import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, FlaskConical, HelpCircle, Truck, Calculator, Shield, Search, ArrowRight } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const navLinks = [
  { label: 'Products', icon: FlaskConical, onClick: true, href: undefined },
  { label: 'Calculator', icon: Calculator, href: '/calculator' },
  { label: 'Protocols', icon: FlaskConical, href: '/protocols' },
  { label: 'Track', icon: Truck, href: '/track-order' },
  { label: 'FAQ', icon: HelpCircle, href: '/faq' },
  { label: 'Lab Reports', icon: Shield, href: '/coa' },
];

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => { onMenuClick(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 shrink-0 hover:opacity-90 transition-opacity"
            >
              <img
                src="/logo.jpeg?v=3"
                alt="The Amine Protocol"
                className="h-9 lg:h-10 w-auto object-contain rounded-lg"
              />
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-primary tracking-wider leading-tight">THE AMINE</p>
                <p className="text-xs font-bold text-primary tracking-wider leading-tight">PROTOCOL</p>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                link.onClick ? (
                  <button
                    key={link.label}
                    onClick={onMenuClick}
                    className="relative text-[15px] font-medium text-primary hover:text-secondary transition-colors group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative text-[15px] font-medium text-primary hover:text-secondary transition-colors group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                  </a>
                )
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Search (desktop) */}
              <div className={`hidden md:flex items-center transition-all duration-300 ${searchOpen ? 'w-48' : 'w-10'}`}>
                {searchOpen ? (
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search Products"
                      className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                      autoFocus
                      onBlur={() => setSearchOpen(false)}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Search className="w-5 h-5 text-primary" />
                  </button>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={onCartClick}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-primary" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5 text-primary" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="absolute top-0 right-0 bottom-0 w-[300px] bg-white shadow-2xl border-l border-gray-100 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <img src="/logo.jpeg?v=3" alt="The Amine Protocol" className="h-8 w-auto object-contain rounded-md" />
                <div>
                  <p className="text-xs font-bold text-primary tracking-wider leading-tight">THE AMINE</p>
                  <p className="text-xs font-bold text-primary tracking-wider leading-tight">PROTOCOL</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-primary transition-colors rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search Products"
                  className="w-full pl-9 pr-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-secondary"
                />
              </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  link.onClick ? (
                    <button
                      key={i}
                      onClick={() => { onMenuClick(); setMobileMenuOpen(false); }}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-primary font-medium hover:bg-accent-light transition-colors text-left"
                    >
                      {link.label}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <a
                      key={i}
                      href={link.href}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-primary font-medium hover:bg-accent-light transition-colors"
                    >
                      {link.label}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )
                ))}
              </div>
            </nav>

            {/* Cart Button */}
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => { onCartClick(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
