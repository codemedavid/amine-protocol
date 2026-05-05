import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface SubNavProps {
    selectedCategory: string;
    onCategoryClick: (categoryId: string) => void;
}

const SubNav: React.FC<SubNavProps> = ({ selectedCategory, onCategoryClick }) => {
    const { categories, loading } = useCategories();

    if (loading) {
        return (
            <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 hidden md:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex space-x-3 overflow-x-auto">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="animate-pulse bg-gray-100 h-9 w-28 rounded-full" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <nav className="bg-white/95 backdrop-blur-md sticky top-[64px] lg:top-[80px] z-30 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-2 py-3 overflow-x-auto scrollbar-hide">
                    {categories.map((category) => {
                        const isSelected = selectedCategory === category.id;
                        return (
                            <button
                                key={category.id}
                                onClick={() => onCategoryClick(category.id)}
                                className={`flex items-center px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 text-sm ${
                                    isSelected
                                        ? 'bg-secondary text-white shadow-sm shadow-secondary/20'
                                        : 'bg-gray-50 text-muted-foreground hover:text-primary hover:bg-accent-light border border-gray-100'
                                }`}
                            >
                                {category.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </nav>
    );
};

export default SubNav;
