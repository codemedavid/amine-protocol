import React from 'react';
import { Trash2, ShoppingBag, ArrowLeft, CreditCard, Plus, Minus } from 'lucide-react';
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
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          <div className="bg-gray-50 rounded-3xl p-12 border border-gray-100">
            <div className="bg-accent-light w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-3">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
              Select products from our catalog to proceed with your order.
            </p>
            <button
              onClick={onContinueShopping}
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-semibold px-6 py-3 rounded-full transition-all w-full justify-center"
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

  return (
    <div className="min-h-screen bg-white py-6 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onContinueShopping}
            className="text-muted-foreground hover:text-primary font-medium mb-6 flex items-center gap-2 transition-colors group text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Catalog
          </button>
          <div className="flex justify-between items-end pb-4 border-b border-gray-100">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-3">
                Shopping Cart
                <span className="text-sm font-normal text-muted-foreground bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} Items
                </span>
              </h1>
            </div>
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-2 hover:bg-red-50 px-3 py-2 rounded-full transition-colors"
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
                className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-xs hover:shadow-card transition-all"
              >
                <div className="flex gap-5">
                  {/* Product Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-accent-light rounded-xl flex-shrink-0 overflow-hidden">
                    {item.product.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-secondary font-bold text-2xl">
                        {item.product.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-primary text-base md:text-lg mb-1">
                          {item.product.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {item.variation && (
                            <span className="text-secondary font-medium bg-accent-light px-2 py-0.5 rounded-full border border-accent">
                              {item.variation.name}
                            </span>
                          )}
                          {item.product.purity_percentage && item.product.purity_percentage > 0 && (
                            <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                              {item.product.purity_percentage}% Purity
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-muted-foreground hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
                      <div className="flex items-center border border-gray-200 rounded-full bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="p-2.5 hover:bg-gray-50 transition-colors text-muted-foreground"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center font-bold text-primary text-sm">
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
                          className="p-2.5 hover:bg-gray-50 transition-colors text-muted-foreground disabled:opacity-50"
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
                              <div className="text-lg md:text-xl font-bold text-primary">
                                ₱{(currentPrice * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                              </div>
                              {isDiscounted && (
                                <div className="text-xs text-muted-foreground line-through">
                                  ₱{(basePrice * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                                </div>
                              )}
                              <div className="text-xs text-muted-foreground">
                                ₱{currentPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })} / unit
                                {isDiscounted && (
                                  <span className="ml-1 text-emerald-600 font-medium">
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
            <div className="bg-white rounded-2xl p-6 sticky top-24 border border-gray-100 shadow-card">
              <h2 className="text-lg font-bold text-primary mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold text-primary">₱{totalPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}</span>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-base font-bold text-primary">Total Estimate</span>
                    <span className="text-2xl font-bold text-secondary">
                      ₱{totalPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground text-right">+ Shipping calculated at checkout</p>
                </div>
              </div>

              <div className="bg-accent-light rounded-xl p-4 mb-6 border border-accent">
                <p className="text-xs text-secondary font-medium mb-2">Shipping Information:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li className="flex justify-between"><span>Metro Manila</span> <span className="font-medium text-primary">₱150</span></li>
                  <li className="flex justify-between"><span>Provincial</span> <span className="font-medium text-primary">₱200</span></li>
                </ul>
              </div>

              <button
                onClick={onCheckout}
                className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-semibold py-3.5 rounded-full transition-all mb-3 shadow-lg shadow-secondary/20"
              >
                <CreditCard className="w-4 h-4" />
                Proceed to Checkout
              </button>

              <button
                onClick={onContinueShopping}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 text-primary font-medium py-3 rounded-full hover:bg-gray-50 transition-colors text-sm"
              >
                Continue Browsing
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-2">
                {['Secure Encrypted Checkout', 'HPLC Verified Purity', 'Discreet Packaging'].map((label, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 text-[8px]">✓</div>
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
