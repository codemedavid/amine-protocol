import React from 'react';
import { Trash2, ShoppingBag, ArrowLeft, CreditCard, Plus, Minus, Sparkles, Activity } from 'lucide-react';
import type { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout,
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          <div className="bg-charcoal-800/60 backdrop-blur-sm rounded-3xl p-12 border border-charcoal-700/50">
            <div className="bg-charcoal-700/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-charcoal-500" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-white mb-3 flex items-center justify-center gap-2">
              Your cart is empty
            </h2>
            <p className="text-charcoal-400 mb-8 max-w-xs mx-auto">
              Select products from our catalog to proceed with your research order.
            </p>
            <button
              onClick={onContinueShopping}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const finalTotal = totalPrice;

  return (
    <div className="min-h-screen bg-charcoal-900 py-6 md:py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onContinueShopping}
            className="text-charcoal-400 hover:text-gold-400 font-medium mb-6 flex items-center gap-2 transition-colors group text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Catalog</span>
          </button>
          <div className="flex justify-between items-end pb-4 border-b border-charcoal-700/50">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                Shopping Cart
                <span className="text-sm font-normal text-charcoal-400 bg-charcoal-800/80 px-3 py-1 rounded-full border border-charcoal-700/50">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} Items
                </span>
              </h1>
            </div>
            <button
              onClick={clearCart}
              className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-2 hover:bg-red-500/10 px-3 py-2 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-charcoal-800/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-charcoal-700/50 transition-all hover:border-brand-500/30"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-charcoal-900 rounded-lg flex-shrink-0 border border-charcoal-700/50 overflow-hidden">
                    {item.product.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-charcoal-600 font-bold text-2xl">
                        {item.product.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-heading font-bold text-white text-base md:text-lg mb-1">
                          {item.product.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {item.variation && (
                            <span className="text-charcoal-300 font-medium bg-charcoal-800 px-2 py-0.5 rounded border border-charcoal-700/50">
                              Format: {item.variation.name}
                            </span>
                          )}
                          {item.product.purity_percentage && item.product.purity_percentage > 0 && (
                            <span className="text-emerald-400 font-medium flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              <Sparkles className="w-3 h-3" />
                              {item.product.purity_percentage}% Purity
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-charcoal-500 hover:text-red-400 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
                      <div className="flex items-center border border-charcoal-600 rounded-lg bg-charcoal-800">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="p-2 hover:bg-charcoal-700 transition-colors rounded-l-lg text-charcoal-400"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center font-bold text-white text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            const availableStock = item.variation ? item.variation.stock_quantity : item.product.stock_quantity;
                            if (item.quantity >= availableStock) {
                              alert(`Only ${availableStock} item(s) available in stock.`);
                              return;
                            }
                            updateQuantity(index, item.quantity + 1);
                          }}
                          disabled={(() => {
                            const availableStock = item.variation ? item.variation.stock_quantity : item.product.stock_quantity;
                            return item.quantity >= availableStock;
                          })()}
                          className="p-2 hover:bg-charcoal-700 transition-colors rounded-r-lg text-charcoal-400 disabled:opacity-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        {(() => {
                          const basePrice = item.variation ? item.variation.price : item.product.base_price;
                          let currentPrice = basePrice;

                          const isDiscounted = item.variation
                            ? (item.variation.discount_active && item.variation.discount_price !== null && item.variation.discount_price < basePrice)
                            : (item.product.discount_active && item.product.discount_price !== null && item.product.discount_price < item.product.base_price);

                          if (isDiscounted) {
                            currentPrice = item.variation?.discount_price || item.product.discount_price || basePrice;
                          }

                          return (
                            <>
                              <div className="text-lg md:text-xl font-bold text-white">
                                ₱{(currentPrice * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                              </div>
                              {isDiscounted && (
                                <div className="text-xs text-charcoal-500 line-through">
                                  ₱{(basePrice * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                                </div>
                              )}
                              <div className="text-xs text-charcoal-400">
                                ₱{currentPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })} / unit
                                {isDiscounted && (
                                  <span className="ml-1 text-emerald-400 font-medium">
                                    ({Math.round((1 - currentPrice / basePrice) * 100)}% off)
                                  </span>
                                )}
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-charcoal-800/60 backdrop-blur-sm rounded-xl p-6 sticky top-24 border border-charcoal-700/50">
              <h2 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
                Order Summary
                <Activity className="w-4 h-4 text-gold-400" />
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-charcoal-400 text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">₱{totalPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}</span>
                </div>

                <div className="pt-3 border-t border-charcoal-700/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-base font-bold text-white">Total Estimate</span>
                    <span className="text-2xl font-bold text-gradient-gold">
                      ₱{finalTotal.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-500 text-right font-normal">+ Shipping calculated at checkout</p>
                </div>
              </div>

              <div className="bg-brand-900/20 rounded-lg p-4 mb-6 border border-brand-700/30">
                <p className="text-xs text-brand-300 font-medium mb-2">Shipping Information:</p>
                <ul className="text-xs text-charcoal-400 space-y-1">
                  <li className="flex justify-between"><span>Metro Manila</span> <span className="font-medium text-charcoal-300">₱150</span></li>
                  <li className="flex justify-between"><span>Provincial</span> <span className="font-medium text-charcoal-300">₱200</span></li>
                </ul>
              </div>

              <button
                onClick={onCheckout}
                className="w-full btn-primary py-3 md:py-4 text-sm md:text-base mb-3 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Proceed to Checkout
              </button>

              <button
                onClick={onContinueShopping}
                className="w-full btn-secondary py-3 text-sm flex items-center justify-center gap-2"
              >
                Continue Browsing
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-charcoal-700/50 flex flex-col gap-2">
                {['Secure Encrypted Checkout', 'HPLC Verified Purity', 'Discreet Packaging'].map((label, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-charcoal-400">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-[8px]">✓</div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
