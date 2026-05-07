import { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Shop', href: '#shop' },
  { label: 'COA Library', href: '#quality' },
  { label: 'Partner Program', href: '#process' },
  { label: 'Contact', href: '#faq' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 8 C12 8 8 16 8 20 C8 24 12 32 20 32 C28 32 32 24 32 20 C32 16 28 8 20 8Z" />
                <path d="M14 14 C14 14 16 18 20 18 C24 18 26 14 26 14" />
                <path d="M14 26 C14 26 16 22 20 22 C24 22 26 26 26 26" />
                <line x1="20" y1="8" x2="20" y2="32" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-primary tracking-wider leading-tight">NEXTGEN</p>
              <p className="text-xs font-bold text-primary tracking-wider leading-tight">PEPTIDES</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-[15px] font-medium text-primary hover:text-secondary transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Search */}
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

            <button className="hidden md:flex p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <Heart className="w-5 h-5 text-primary" />
            </button>

            <button className="hidden md:flex p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            <Button
              variant="outline"
              className="hidden md:inline-flex rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all"
            >
              Sign In
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Menu className="w-5 h-5 text-primary" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <svg viewBox="0 0 40 40" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 8 C12 8 8 16 8 20 C8 24 12 32 20 32 C28 32 32 24 32 20 C32 16 28 8 20 8Z" />
                        <path d="M14 14 C14 14 16 18 20 18 C24 18 26 14 26 14" />
                        <path d="M14 26 C14 26 16 22 20 22 C24 22 26 26 26 26" />
                        <line x1="20" y1="8" x2="20" y2="32" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary tracking-wider leading-tight">NEXTGEN</p>
                      <p className="text-xs font-bold text-primary tracking-wider leading-tight">PEPTIDES</p>
                    </div>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search Products"
                      className="w-full pl-9 pr-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.label}>
                        <a
                          href={link.href}
                          className="flex items-center justify-between px-4 py-3 rounded-xl text-primary font-medium hover:bg-accent-light transition-colors"
                        >
                          {link.label}
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </SheetClose>
                    ))}
                  </nav>

                  <div className="flex items-center gap-3 pt-4 border-t">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                      <Heart className="w-5 h-5 text-primary" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                      <ShoppingBag className="w-5 h-5 text-primary" />
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        0
                      </span>
                    </button>
                    <Button className="flex-1 rounded-full bg-primary text-white hover:bg-primary-light">
                      Sign In
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
