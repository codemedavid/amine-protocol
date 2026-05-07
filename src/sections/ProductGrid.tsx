import { ArrowRight, ShoppingCart } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const products = [
  {
    name: 'NAD+5-AMINO-MQ',
    category: 'Hormone Analogs',
    price: 150.00,
    image: '/images/product-1.png',
    action: 'read',
  },
  {
    name: 'TA-1 Caps',
    category: 'Antimicrobial Peptides',
    price: 100.00,
    image: '/images/product-2.png',
    action: 'cart',
  },
  {
    name: 'DSIP',
    category: 'Neuropeptides',
    price: 35.00,
    image: '/images/product-3.png',
    action: 'cart',
  },
  {
    name: 'KissPeptin',
    category: 'Hormone Analogs',
    price: 35.00,
    image: '/images/product-4.png',
    action: 'read',
  },
  {
    name: 'GHK-Cu/KPV Blend',
    category: 'Copper Peptides',
    price: 65.00,
    image: '/images/product-5.png',
    action: 'cart',
  },
  {
    name: 'Ipamorelin',
    category: 'Hormone Analogs',
    price: 28.00,
    image: '/images/product-6.png',
    action: 'read',
  },
  {
    name: 'Prostamax',
    category: 'Hormone Analogs',
    price: 60.00,
    image: '/images/product-7.png',
    action: 'read',
  },
  {
    name: 'Testagen',
    category: 'Hormone Analogs',
    price: 80.00,
    image: '/images/product-8.png',
    action: 'read',
  },
];

export default function ProductGrid() {
  return (
    <section className="w-full py-16 lg:py-24 bg-gradient-to-b from-accent-light/50 to-white" id="shop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3">
              Popular Peptides
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Frequently requested compounds with documented batch verification.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300">
                {/* Image */}
                <div className="relative bg-gradient-to-b from-accent-light/30 to-white p-6 flex items-center justify-center h-52 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-40 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="inline-block text-[11px] font-medium text-secondary bg-accent-light/50 px-2.5 py-1 rounded-full mb-2">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-primary text-sm mb-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    From <span className="font-semibold text-primary">${product.price.toFixed(2)}</span>
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-light text-secondary border border-accent">
                      Third Party Tested
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-light text-secondary border border-accent">
                      ≥99% Purity
                    </span>
                  </div>

                  {/* Action Button */}
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200">
                    {product.action === 'cart' ? (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Add to cart
                      </>
                    ) : (
                      <>
                        Read more
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
