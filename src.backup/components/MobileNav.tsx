import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface MobileNavProps {
  activeCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeCategory, onCategoryClick }) => {
  const { categories } = useCategories();

  return (
    <div className="sticky top-[65px] z-40 bg-black/90 backdrop-blur-xl border-b border-white/10 md:hidden">
      <div className="flex overflow-x-auto scrollbar-hide px-4 py-3 gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${activeCategory === category.id
                ? 'bg-white text-black shadow-glow'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;

