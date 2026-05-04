import React, { useState } from 'react';
import { Package } from 'lucide-react';
import type { Product, ProductVariation } from '../types';

interface MenuItemCardProps {
  product: Product;
  onAddToCart?: (product: Product, variation?: ProductVariation, quantity?: number) => void;
  cartQuantity?: number;
  onUpdateQuantity?: (index: number, quantity: number) => void;
  onProductClick?: (product: Product) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  product,
  onAddToCart,
  cartQuantity = 0,
  onProductClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>(
    product.variations && product.variations.length > 0 ? product.variations[0] : undefined
  );

  const currentPrice = (() => {
    return selectedVariation
      ? (selectedVariation.discount_active && selectedVariation.discount_price)
        ? selectedVariation.discount_price
        : selectedVariation.price
      : (product.discount_active && product.discount_price)
        ? product.discount_price
        : product.base_price;
  })();

  const hasDiscount = selectedVariation
    ? (selectedVariation.discount_active && selectedVariation.discount_price !== null)
    : (product.discount_active && product.discount_price !== null);

  const originalPrice = selectedVariation ? selectedVariation.price : product.base_price;

  const hasAnyStock = product.variations && product.variations.length > 0
    ? product.variations.some(v => v.stock_quantity > 0)
    : product.stock_quantity > 0;

  return (
    <div className="group relative h-full flex flex-col rounded-2xl border border-charcoal-700/50 overflow-hidden transition-all duration-500 hover:border-brand-500/40 hover:shadow-glow-blue"
      style={{ background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(15, 23, 42, 0.6))' }}
    >
      {/* Hover glow overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(43, 87, 151, 0.08), transparent 70%)' }}
      />

      {/* Click overlay for product details */}
      <div
        onClick={() => onProductClick?.(product)}
        className="absolute inset-x-0 top-0 h-28 sm:h-44 z-10 cursor-pointer"
        title="View details"
      />

      {/* Product Image */}
      <div className="relative h-28 sm:h-44 bg-charcoal-800 overflow-hidden">
        {product.image_url && !imageError ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-charcoal-600 bg-charcoal-800">
            <Package className="w-16 h-16 opacity-30" />
          </div>
        )}

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none z-20">
          {product.featured && (
            <span className="px-2.5 py-1 bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal-900 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-glow-gold">
              Featured
            </span>
          )}
          {hasDiscount && (
            <span className="px-2.5 py-1 bg-emerald-500/90 text-white text-[10px] font-bold rounded-md backdrop-blur-sm">
              {Math.round((1 - currentPrice / originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Stock Status Overlay */}
        {(!product.available || !hasAnyStock) && (
          <div className="absolute inset-0 bg-charcoal-900/80 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="bg-charcoal-800 text-charcoal-400 px-3 py-1 text-xs font-bold rounded-lg border border-charcoal-700 uppercase tracking-wide">
              {!product.available ? 'Unavailable' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col relative z-[1]">
        <h3 className="font-heading font-semibold text-white text-sm sm:text-base mb-1 line-clamp-2 tracking-tight">
          {product.name}
        </h3>
        <p className="text-[10px] sm:text-xs text-charcoal-400 mb-2 sm:mb-3 line-clamp-2 min-h-[1.5rem] sm:min-h-[2.5rem] leading-relaxed">
          {product.description}
        </p>

        {/* Variations (Sizes) */}
        <div className="mb-2 sm:mb-4 min-h-[1.5rem] sm:min-h-[2rem]">
          {product.variations && product.variations.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {product.variations.slice(0, 2).map((variation) => {
                const isOutOfStock = variation.stock_quantity === 0;
                return (
                  <button
                    key={variation.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isOutOfStock) {
                        setSelectedVariation(variation);
                      }
                    }}
                    disabled={isOutOfStock}
                    className={`
                      px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-medium rounded-lg border transition-all duration-200 relative z-20
                      ${selectedVariation?.id === variation.id && !isOutOfStock
                        ? 'bg-brand-500/20 border-brand-500/50 text-brand-300'
                        : isOutOfStock
                          ? 'bg-charcoal-800 text-charcoal-600 border-charcoal-700 cursor-not-allowed'
                          : 'bg-charcoal-800/50 text-charcoal-300 border-charcoal-600 hover:border-brand-500/40 hover:text-brand-300'
                      }
                    `}
                  >
                    {variation.name}
                  </button>
                );
              })}
              {product.variations.length > 2 && (
                <span className="text-[9px] sm:text-[10px] text-charcoal-500 self-center">
                  +{product.variations.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex-1" />

        {/* Price and Cart Actions */}
        <div className="flex flex-col gap-2 sm:gap-3 mt-auto">
          {hasDiscount ? (
            <div className="flex items-baseline gap-1 sm:gap-2">
              <span className="text-base sm:text-lg font-semibold text-white">
                ₱{currentPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
              </span>
              <span className="text-[10px] sm:text-xs text-charcoal-500 line-through">
                ₱{originalPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
              </span>
            </div>
          ) : (
            <div className="flex items-baseline">
              <span className="text-base sm:text-lg font-semibold text-white">
                ₱{currentPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
              </span>
            </div>
          )}

          <div className="flex w-full pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!product.available || !hasAnyStock) return;
                if (product.variations && product.variations.length > 0 && !selectedVariation) {
                  onProductClick?.(product);
                  return;
                }
                onAddToCart?.(product, selectedVariation, 1);
              }}
              disabled={!product.available || !hasAnyStock}
              className={`w-full py-2.5 sm:py-3 text-[11px] sm:text-sm flex items-center justify-center gap-2 font-semibold transition-all rounded-xl
                ${(!product.available || !hasAnyStock)
                  ? 'bg-charcoal-800 text-charcoal-600 cursor-not-allowed border border-charcoal-700'
                  : 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-charcoal-900 hover:shadow-glow-gold active:scale-[0.98]'}
              `}
              style={(!product.available || !hasAnyStock) ? {} : { backgroundSize: '200% auto' }}
            >
              <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Add to Cart</span>
            </button>
          </div>

          {/* Cart Status */}
          {cartQuantity > 0 && (
            <div className="text-center text-[10px] text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 rounded-lg py-1">
              {cartQuantity} in cart
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
