import React, { useState, useRef } from 'react';
import MenuItemCard from './MenuItemCard';
import Hero from './Hero';
import WhoWeAre from './WhoWeAre';
import WhyChooseUs from './WhyChooseUs';
import ProductDetailModal from './ProductDetailModal';
import type { Product, ProductVariation, CartItem } from '../types';
import { Search, Filter, Package, FlaskConical } from 'lucide-react';

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

      <div className="min-h-screen bg-charcoal-900">
        <Hero
          onShopAll={() => {
            productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />

        <WhoWeAre
          onCtaClick={() => {
            productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />

        <WhyChooseUs />

        {/* Products section */}
        <div className="relative" ref={productsRef}>
          {/* Background effects */}
          <div className="absolute inset-0 hex-pattern opacity-10" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

          <div className="relative z-10 container mx-auto px-4 py-16">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-900/40 border border-brand-700/30 mb-4">
                <FlaskConical className="w-3.5 h-3.5 text-brand-400" />
                <span className="text-xs font-semibold text-brand-300 tracking-widest uppercase">Research Catalog</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3">
                Our Peptide <span className="text-gradient-gold">Collection</span>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto" />
            </div>

            {/* Search and Filter Controls */}
            <div className="mb-10 flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search catalog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-12"
                />
              </div>

              <div className="flex items-center gap-3 bg-charcoal-800/80 rounded-xl px-4 py-3 border border-charcoal-600">
                <Filter className="text-charcoal-400 w-5 h-5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'purity')}
                  className="focus:outline-none bg-transparent font-medium text-gray-300 text-sm"
                >
                  <option value="name" className="bg-charcoal-800 text-gray-200">Sort by Name</option>
                  <option value="price" className="bg-charcoal-800 text-gray-200">Sort by Price</option>
                  <option value="purity" className="bg-charcoal-800 text-gray-200">Sort by Purity</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-8 flex items-center justify-center">
              <span className="text-sm font-medium text-charcoal-400 bg-charcoal-800/50 px-4 py-1.5 rounded-full border border-charcoal-700/50">
                {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'}
              </span>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-charcoal-800/50 rounded-2xl border border-charcoal-700/50 p-12 max-w-md mx-auto backdrop-blur-sm">
                  <div className="bg-charcoal-700/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="w-10 h-10 text-charcoal-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                  <p className="text-charcoal-400 mb-6">
                    {searchQuery
                      ? `No products match "${searchQuery}".`
                      : 'No products available.'}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-brand-400 font-semibold hover:text-brand-300 transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
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
      </div>
    </>
  );
};

export default Menu;
