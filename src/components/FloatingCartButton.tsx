import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface FloatingCartButtonProps {
  itemCount: number;
  onCartClick: () => void;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ itemCount, onCartClick }) => {
  if (itemCount === 0) return null;

  return (
    <button
      onClick={onCartClick}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 bg-secondary hover:bg-secondary-dark text-white rounded-full shadow-lg hover:shadow-xl shadow-secondary/30 transition-all duration-300 hover:scale-105 z-50 p-3 md:p-4 group"
      aria-label="View cart"
    >
      <div className="relative">
        <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
        <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
          {itemCount}
        </span>
      </div>
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap hidden md:block">
        <div className="bg-primary text-white text-xs px-3 py-2 rounded-lg shadow-lg">
          {itemCount} item{itemCount !== 1 ? 's' : ''} in cart
          <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-2 h-2 bg-primary"></div>
        </div>
      </div>
    </button>
  );
};

export default FloatingCartButton;
