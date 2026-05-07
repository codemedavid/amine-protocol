import React, { useState } from 'react';
import { X, Package, Beaker, ShoppingCart, Plus, Minus, Sparkles, ArrowLeft } from 'lucide-react';
import type { Product, ProductVariation } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, variation: ProductVariation | undefined, quantity: number) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart }) => {
  const getFirstAvailableVariation = () => {
    if (!product.variations || product.variations.length === 0) return undefined;
    const available = product.variations.find(v => v.stock_quantity > 0);
    return available || product.variations[0];
  };

  const [imageError, setImageError] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>(
    getFirstAvailableVariation()
  );
  const [quantity, setQuantity] = useState(1);

  const hasDiscount = product.discount_active && product.discount_price;

  const calculatePrice = () => {
    if (!selectedVariation) return product.base_price;
    return selectedVariation.price;
  }

  const currentPrice = calculatePrice();
  const showPurity = Boolean(product.purity_percentage);

  const hasAnyStock = product.variations && product.variations.length > 0
    ? product.variations.some(v => v.stock_quantity > 0)
    : product.stock_quantity > 0;

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariation, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-charcoal-900/80 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-charcoal-800/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden my-2 sm:my-8 border border-charcoal-700/50">
        {/* Header */}
        <div className="bg-charcoal-800 p-3 sm:p-4 md:p-6 relative border-b border-charcoal-700/50">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 p-1.5 sm:p-2 hover:bg-white/5 rounded-lg transition-colors text-charcoal-400 hover:text-white"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
          <div className="pr-10 sm:pr-12">
            <h2 className="font-heading text-base sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1.5 sm:mb-2 text-white tracking-tight">{product.name}</h2>
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-wrap">
              {showPurity && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {product.purity_percentage}% Pure
                </span>
              )}
              {product.featured && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold bg-gold-500/10 border border-gold-500/20 text-gold-400">
                  Featured
                </span>
              )}
              {hasDiscount && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  Sale
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(90vh-280px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {/* Left Column */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {/* Product Image */}
              <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 bg-charcoal-900 rounded-xl overflow-hidden border border-charcoal-700/50">
                {product.image_url && !imageError ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-charcoal-600 bg-charcoal-900">
                    <Package className="w-16 h-16 sm:w-20 sm:h-20 opacity-30" />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-heading text-sm sm:text-base md:text-lg font-bold text-white mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                  <Beaker className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-brand-400" />
                  Product Description
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-charcoal-300 leading-relaxed font-sans">{product.description}</p>
              </div>

              {/* Complete Set Inclusions */}
              {product.inclusions && product.inclusions.length > 0 && (
                <div className="bg-brand-900/20 rounded-xl p-3 sm:p-4 border border-brand-700/30">
                  <h3 className="font-heading text-sm sm:text-base md:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                    <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-brand-400" />
                    Kit Inclusions
                  </h3>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {product.inclusions.map((inclusion, idx) => (
                      <li key={idx} className="text-[11px] sm:text-xs md:text-sm text-charcoal-300 flex items-start gap-2">
                        <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                        <span className="flex-1">{inclusion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Scientific Details */}
              <div className="bg-charcoal-900/50 rounded-xl p-3 sm:p-4 border border-charcoal-700/50">
                <h3 className="font-heading text-sm sm:text-base md:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                  <Beaker className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-brand-400" />
                  Technical Specifications
                </h3>
                <div className="space-y-1.5 sm:space-y-2">
                  {showPurity && (
                    <div className="flex justify-between">
                      <span className="text-charcoal-400 text-[11px] sm:text-xs md:text-sm">Purity Analysis:</span>
                      <span className="font-semibold text-brand-300 text-[11px] sm:text-xs md:text-sm">{product.purity_percentage}% (HPLC Verified)</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-charcoal-400 text-[11px] sm:text-xs md:text-sm">Storage:</span>
                    <span className="font-medium text-charcoal-200 text-[11px] sm:text-xs md:text-sm">{product.storage_conditions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-400 text-[11px] sm:text-xs md:text-sm">Availability:</span>
                    <span className={`font-medium text-[11px] sm:text-xs md:text-sm ${(product.variations && product.variations.length > 0
                      ? product.variations.some(v => v.stock_quantity > 0)
                      : product.stock_quantity > 0)
                      ? 'text-emerald-400'
                      : 'text-red-400'
                      }`}>
                      {product.variations && product.variations.length > 0
                        ? product.variations.reduce((sum, v) => sum + v.stock_quantity, 0)
                        : product.stock_quantity} units
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Purchase Section */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {/* Price */}
              <div className="bg-charcoal-900/50 rounded-xl p-3 sm:p-4 md:p-6 border border-charcoal-700/50">
                <div className="text-center mb-3 sm:mb-4">
                  {hasDiscount ? (
                    <>
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-charcoal-500 line-through font-medium">
                          ₱{product.base_price.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                          {Math.round((1 - product.discount_price! / product.base_price) * 100)}% OFF
                        </span>
                      </div>
                      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                        ₱{currentPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                      </div>
                      <div className="inline-block bg-emerald-500/10 text-emerald-400 px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 rounded text-[10px] sm:text-xs md:text-sm font-bold border border-emerald-500/20">
                        Savings: ₱{(product.base_price - product.discount_price!).toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                      </div>
                    </>
                  ) : (
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                      ₱{currentPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                    </div>
                  )}
                </div>

                {/* Size Selection */}
                {product.variations && product.variations.length > 0 && (
                  <div className="mb-3 sm:mb-4">
                    <label className="block text-xs sm:text-sm font-bold text-charcoal-300 mb-1.5 sm:mb-2 uppercase tracking-wide">
                      Select Format
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {product.variations.map((variation) => {
                        const isOutOfStock = variation.stock_quantity === 0;
                        const isSelected = selectedVariation?.id === variation.id;
                        return (
                          <button
                            key={variation.id}
                            onClick={() => {
                              if (variation.stock_quantity > 0) {
                                setSelectedVariation(variation);
                              }
                            }}
                            disabled={isOutOfStock}
                            className={`
                                p-3 rounded-lg border text-sm text-left transition-all
                                ${isSelected
                                ? 'border-brand-500/50 bg-brand-500/10 text-white ring-1 ring-brand-500/50'
                                : 'border-charcoal-600 hover:border-brand-500/30 text-charcoal-300 bg-charcoal-800/50'
                              }
                                ${isOutOfStock ? 'opacity-40 cursor-not-allowed' : ''}
                              `}
                          >
                            <div className="font-bold text-white">{variation.name}</div>
                            <div className="text-xs opacity-80">₱{variation.price.toLocaleString('en-PH')}</div>
                            {isOutOfStock && <div className="text-xs text-red-400 font-bold mt-1">Out of Stock</div>}
                          </button>
                        )
                      })}
                    </div>
                    {selectedVariation && selectedVariation.stock_quantity === 0 && (
                      <p className="text-xs text-red-400 mt-1.5 font-semibold">
                        This format is currently unavailable.
                      </p>
                    )}
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-3 sm:mb-4">
                  <label className="block text-xs sm:text-sm font-bold text-charcoal-300 mb-1.5 sm:mb-2 uppercase tracking-wide">
                    Quantity
                  </label>
                  <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5">
                    <button
                      onClick={decrementQuantity}
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-charcoal-800 border border-charcoal-600 hover:bg-charcoal-700 hover:border-charcoal-500 rounded-lg transition-all active:scale-95 text-charcoal-300"
                      disabled={!product.available}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-xl sm:text-2xl font-bold text-white min-w-[50px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-charcoal-800 border border-charcoal-600 hover:bg-charcoal-700 hover:border-charcoal-500 rounded-lg transition-all active:scale-95 text-charcoal-300"
                      disabled={!product.available}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-charcoal-800/80 rounded-lg p-3 mb-4 border border-charcoal-700/50">
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal-400 font-medium text-sm">Total Estimate:</span>
                    <span className="text-xl font-bold text-white">
                      ₱{(currentPrice * quantity).toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.available || !hasAnyStock || (selectedVariation && selectedVariation.stock_quantity === 0) || (!selectedVariation && product.stock_quantity === 0)}
                  className="w-full btn-primary py-3 md:py-4 text-sm md:text-base flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {!product.available
                    ? 'Unavailable'
                    : (!hasAnyStock || (selectedVariation && selectedVariation.stock_quantity === 0) || (!selectedVariation && product.stock_quantity === 0)
                      ? 'Out of Stock'
                      : 'Add to Cart')}
                </button>

                {/* Return to Shop Button */}
                <button
                  onClick={onClose}
                  className="w-full mt-3 py-3 text-sm md:text-base font-medium text-charcoal-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Return to Shop
                </button>
              </div>

              {/* Stock Alert */}
              {product.available && (product.variations && product.variations.length > 0
                ? product.variations.some(v => v.stock_quantity > 0 && v.stock_quantity < 10)
                : product.stock_quantity < 10 && product.stock_quantity > 0) && (
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                    <p className="text-xs text-orange-400 font-medium flex items-center gap-2">
                      <span className="font-bold">!</span>
                      Low stock: Only {product.variations && product.variations.length > 0
                        ? product.variations.reduce((sum, v) => sum + v.stock_quantity, 0)
                        : product.stock_quantity} units remaining
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
