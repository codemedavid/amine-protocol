import React, { useState, useRef } from 'react';
import MenuItemCard from './MenuItemCard';
import ProductDetailModal from './ProductDetailModal';
import HeroSection from './sections/HeroSection';
import GuaranteeSection from './sections/GuaranteeSection';
import QualitySection from './sections/QualitySection';
import WhyChooseSection from './sections/WhyChooseSection';
import SucceedSection from './sections/SucceedSection';
import ProductionSection from './sections/ProductionSection';
import ProcessSection from './sections/ProcessSection';
import FAQHomeSection from './sections/FAQHomeSection';
import type { Product, ProductVariation, CartItem } from '../types';
import { Search, Filter, Package, FlaskConical } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface MenuProps {
  menuItems: Product[];
  addToCart: (product: Product, variation?: ProductVariation, quantity?: number) => void;
  cartItems: CartItem[];
  updateQuantity: (index: number, quantity: number) => void;
}

const Menu: React.FC<MenuProps> = ({ menuItems, addToCart, cartItems }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'purity'>('name');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const productsRef = useRef<HTMLDivElement | null>(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredProducts = menuItems.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a.name === 'Tirzepatide') return -1;
    if (b.name === 'Tirzepatide') return 1;
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'price': return a.base_price - b.base_price;
      case 'purity': return b.purity_percentage - a.purity_percentage;
      default: return 0;
    }
  });

  const getCartQuantity = (productId: string, variationId?: string) => {
    return cartItems
      .filter(item =>
        item.product.id === productId &&
        (variationId ? item.variation?.id === variationId : !item.variation)
      )
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <>
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, variation, quantity) => {
            addToCart(product, variation, quantity);
          }}
        />
      )}

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <HeroSection onShopAll={scrollToProducts} />

        {/* Guarantee Section */}
        <GuaranteeSection />

        {/* Quality Section */}
        <QualitySection />

        {/* Why Choose Section */}
        <WhyChooseSection />

        {/* Products Section */}
        <div className="w-full py-16 lg:py-24 bg-gradient-to-b from-accent-light/50 to-white" id="shop" ref={productsRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <ScrollReveal>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-light border border-accent mb-4">
                  <FlaskConical className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-xs font-semibold text-secondary tracking-widest uppercase">Research Catalog</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3">
                  Popular Peptides
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Frequently requested compounds with documented batch verification.
                </p>
              </div>
            </ScrollReveal>

            {/* Search and Filter */}
            <div className="mb-10 flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search catalog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all placeholder-gray-400 text-primary"
                />
              </div>

              <div className="flex items-center gap-3 bg-white rounded-full px-5 py-3 border border-gray-200">
                <Filter className="text-muted-foreground w-4 h-4" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'purity')}
                  className="focus:outline-none bg-transparent font-medium text-primary text-sm"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="purity">Sort by Purity</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-8 flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground bg-accent-light px-4 py-1.5 rounded-full border border-accent">
                {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'}
              </span>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-12 max-w-md mx-auto">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery
                      ? `No products match "${searchQuery}".`
                      : 'No products available.'}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-secondary font-semibold hover:text-secondary-dark transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                {sortedProducts.map((product) => (
                  <MenuItemCard
                    key={product.id}
                    product={product}
                    cartQuantity={getCartQuantity(product.id)}
                    onProductClick={setSelectedProduct}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Succeed Section */}
        <SucceedSection />

        {/* Production Section */}
        <ProductionSection />

        {/* Process Section */}
        <ProcessSection onShopAll={scrollToProducts} />

        {/* FAQ Section */}
        <FAQHomeSection />
      </div>
    </>
  );
};

export default Menu;
