import React, { useState } from 'react';
import { Package, ShoppingCart, ArrowRight } from 'lucide-react';
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
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col">
      {/* Image */}
      <div
        className="relative bg-gradient-to-b from-accent-light/30 to-white overflow-hidden cursor-pointer"
        style={{ height: '180px' }}
        onClick={() => onProductClick?.(product)}
      >
        {product.image_url && !imageError ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Package className="w-16 h-16 opacity-20" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.featured && (
            <span className="px-2.5 py-1 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              Featured
            </span>
          )}
          {hasDiscount && (
            <span className="px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full">
              {Math.round((1 - currentPrice / originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Out of stock overlay */}
        {(!product.available || !hasAnyStock) && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="bg-gray-100 text-muted-foreground px-3 py-1 text-xs font-bold rounded-full border border-gray-200 uppercase tracking-wide">
              {!product.available ? 'Unavailable' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Category */}
        {product.category && (
          <span className="inline-block text-[11px] font-medium text-secondary bg-accent-light px-2.5 py-1 rounded-full mb-2 w-fit">
            {product.category}
          </span>
        )}

        <h3
          className="font-semibold text-primary text-sm mb-1 line-clamp-2 cursor-pointer hover:text-secondary transition-colors"
          onClick={() => onProductClick?.(product)}
        >
          {product.name}
        </h3>

        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Variations */}
        {product.variations && product.variations.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.variations.slice(0, 2).map((variation) => {
              const isOutOfStock = variation.stock_quantity === 0;
              return (
                <button
                  key={variation.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isOutOfStock) setSelectedVariation(variation);
                  }}
                  disabled={isOutOfStock}
                  className={`px-2.5 py-1 text-[10px] sm:text-xs font-medium rounded-full border transition-all duration-200 ${
                    selectedVariation?.id === variation.id && !isOutOfStock
                      ? 'bg-secondary border-secondary text-white'
                      : isOutOfStock
                        ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                        : 'bg-white text-primary border-gray-200 hover:border-secondary hover:text-secondary'
                  }`}
                >
                  {variation.name}
                </button>
              );
            })}
            {product.variations.length > 2 && (
              <span className="text-[10px] text-muted-foreground self-center">
                +{product.variations.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-light text-secondary border border-accent">
            Third Party Tested
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-light text-secondary border border-accent">
            ≥99% Purity
          </span>
        </div>

        <div className="flex-1" />

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          {hasDiscount ? (
            <>
              <span className="text-base font-bold text-primary">
                ₱{currentPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
              </span>
              <span className="text-xs text-muted-foreground line-through">
                ₱{originalPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-primary">
              From ₱{currentPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
            </span>
          )}
        </div>

        {/* Cart Button */}
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
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
            (!product.available || !hasAnyStock)
              ? 'bg-gray-50 text-gray-300 cursor-not-allowed border border-gray-100'
              : 'border border-gray-200 text-primary hover:bg-primary hover:text-white hover:border-primary'
          }`}
        >
          {(!product.available || !hasAnyStock) ? (
            <>
              <Package className="w-4 h-4" />
              Unavailable
            </>
          ) : product.variations && product.variations.length > 0 && !selectedVariation ? (
            <>
              Read more
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>

        {/* Cart Status */}
        {cartQuantity > 0 && (
          <div className="mt-2 text-center text-[10px] text-emerald-600 font-medium bg-emerald-50 border border-emerald-100 rounded-full py-1">
            {cartQuantity} in cart
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
