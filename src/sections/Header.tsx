import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, ArrowRight, Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { siteConfig } from '@/lib/siteContent';
import { useCartContext } from '@/lib/cart-context';

const navLinks = [
  { label: 'Shop', href: '#shop' },
  { label: 'Peptide Calculator', href: '/calculator' },
  { label: 'Research Catalog', href: '/catalog' },
  { label: 'Lab Reports', href: '/coa' },
  { label: 'About Us', href: '#about' },
];

const peso = (n: number) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 2 }).format(n);

export default function Header() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems, getTotalItems, getTotalPrice, updateQuantity, removeFromCart, clearCart } = useCartContext();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const CartBadge = () => (
    <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
      {totalItems}
    </span>
  );

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
          <a href="#" className="flex items-center gap-2 shrink-0">
            <img
              src="/images/logowobckgd.png"
              alt={siteConfig.brandName}
              className="h-10 lg:h-12 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-primary tracking-wider leading-tight">{siteConfig.brandName}</p>
            </div>
          </a>

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

          <div className="flex items-center gap-2 lg:gap-4">
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

            <button
              onClick={() => setCartOpen(true)}
              className="flex p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5 text-primary" />
              {totalItems > 0 && <CartBadge />}
            </button>

            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Menu className="w-5 h-5 text-primary" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/logowobckgd.png"
                      alt={siteConfig.brandName}
                      className="h-10 w-auto object-contain"
                    />
                    <p className="text-sm font-bold text-primary tracking-wider leading-tight">{siteConfig.brandName}</p>
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

                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile scrollable sub-nav */}
      <div className="lg:hidden border-t border-gray-100 overflow-x-auto overflow-y-hidden scrollbar-none touch-pan-x">
        <div className="flex items-center gap-1 px-3 py-2 w-max">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium text-primary hover:bg-accent-light hover:text-secondary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-3xl">
          <div className="mx-auto w-12 h-1.5 bg-gray-200 rounded-full mt-2" />
          <SheetHeader>
            <SheetTitle className="text-xl text-primary">Your Cart ({totalItems})</SheetTitle>
          </SheetHeader>
          <div className="max-w-2xl mx-auto w-full px-4 pb-8">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">Your cart is empty.</div>
            ) : (
              <>
                <ul className="divide-y divide-gray-100">
                  {cartItems.map((item, i) => {
                    const price = item.variation
                      ? (item.variation.discount_active && item.variation.discount_price ? item.variation.discount_price : item.variation.price)
                      : (item.product.discount_active && item.product.discount_price ? item.product.discount_price : item.product.base_price);
                    return (
                      <li key={i} className="flex gap-3 py-4">
                        <div className="w-16 h-16 rounded-xl bg-accent-light/40 flex items-center justify-center overflow-hidden shrink-0">
                          {item.product.image_url ? (
                            <img src={item.product.image_url} alt={item.product.name} className="max-h-14 object-contain" />
                          ) : null}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-primary truncate">{item.product.name}</p>
                          {item.variation && (
                            <p className="text-xs text-muted-foreground">{item.variation.name}</p>
                          )}
                          <p className="text-sm font-semibold text-primary mt-1">{peso(price * item.quantity)}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button onClick={() => removeFromCart(i)} className="text-muted-foreground hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="flex items-center border border-gray-200 rounded-full">
                            <button onClick={() => updateQuantity(i, item.quantity - 1)} className="p-1.5 hover:bg-gray-100 rounded-l-full">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(i, item.quantity + 1)} className="p-1.5 hover:bg-gray-100 rounded-r-full">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t mt-2">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-lg font-bold text-primary">{peso(getTotalPrice())}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" onClick={clearCart} className="rounded-full">Clear</Button>
                  <Button
                    className="flex-1 rounded-full bg-primary hover:bg-primary-light text-white py-6"
                    onClick={() => { setCartOpen(false); navigate('/checkout'); }}
                  >
                    Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
