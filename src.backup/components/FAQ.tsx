import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FlaskConical, Package, CreditCard, Truck, ArrowLeft, MessageCircle, HelpCircle } from 'lucide-react';
import { useFAQs } from '../hooks/useFAQs';

const categoryIcons: { [key: string]: React.ReactElement } = {
    'PRODUCT & USAGE': <FlaskConical className="w-5 h-5" />,
    'ORDERING & PACKAGING': <Package className="w-5 h-5" />,
    'PAYMENT METHODS': <CreditCard className="w-5 h-5" />,
    'SHIPPING & DELIVERY': <Truck className="w-5 h-5" />,
};

const FAQ: React.FC = () => {
    const { faqs, categories, loading } = useFAQs();
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const toggleItem = (id: string) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const filteredFAQs = activeCategory
        ? faqs.filter(faq => faq.category === activeCategory)
        : faqs;

    const viberUrl = 'viber://chat?number=%2B639496133242';
    const whatsappUrl = 'https://wa.me/639496133242';

    if (loading) {
        return (
            <div className="min-h-screen bg-charcoal-900 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-charcoal-900">
            {/* Header */}
            <div className="bg-charcoal-800/80 backdrop-blur-sm border-b border-charcoal-700/50 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <a
                            href="/"
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 text-charcoal-400 group-hover:text-gold-400" />
                        </a>
                        <div className="flex items-center gap-2">
                            <HelpCircle className="w-6 h-6 text-gold-400" />
                            <h1 className="text-xl md:text-2xl font-heading font-bold text-white">Frequently Asked Questions</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${activeCategory === null
                            ? 'bg-brand-500 text-white border-brand-500 shadow-glow-blue'
                            : 'bg-charcoal-800/60 text-charcoal-300 border-charcoal-700/50 hover:border-brand-500/40 hover:text-white'
                            }`}
                    >
                        All
                    </button>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all flex items-center gap-2 border ${activeCategory === category
                                ? 'bg-brand-500 text-white border-brand-500 shadow-glow-blue'
                                : 'bg-charcoal-800/60 text-charcoal-300 border-charcoal-700/50 hover:border-brand-500/40 hover:text-white'
                                }`}
                        >
                            <span>
                                {categoryIcons[category]}
                            </span>
                            {category}
                        </button>
                    ))}
                </div>

                {/* FAQ Items by Category */}
                {(activeCategory ? [activeCategory] : categories).map(category => (
                    <div key={category} className="mb-10">
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl border border-charcoal-700/50 bg-charcoal-800/40 backdrop-blur-sm w-full">
                            <span className="text-brand-400">
                                {categoryIcons[category] || <HelpCircle className="w-5 h-5" />}
                            </span>
                            <h2 className="font-bold text-sm md:text-base uppercase tracking-wide text-white">{category}</h2>
                        </div>

                        <div className="space-y-3">
                            {filteredFAQs
                                .filter(faq => faq.category === category)
                                .map(faq => (
                                    <div
                                        key={faq.id}
                                        className="bg-charcoal-800/60 backdrop-blur-sm rounded-xl border border-charcoal-700/50 hover:border-brand-500/30 transition-all duration-200"
                                    >
                                        <button
                                            onClick={() => toggleItem(faq.id)}
                                            className="w-full px-6 py-5 flex items-start justify-between text-left group gap-4"
                                        >
                                            <span className="font-bold text-white text-base md:text-lg group-hover:text-gold-400 transition-colors leading-snug">
                                                {faq.question}
                                            </span>
                                            {openItems.has(faq.id) ? (
                                                <ChevronUp className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-charcoal-500 group-hover:text-gold-400 flex-shrink-0 transition-colors mt-1" />
                                            )}
                                        </button>
                                        {openItems.has(faq.id) && (
                                            <div className="px-6 pb-6 pt-0">
                                                <div className="h-px w-full bg-charcoal-700/50 mb-4"></div>
                                                <p className="text-charcoal-300 whitespace-pre-line leading-relaxed text-base">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}

                {/* Contact CTA */}
                <div className="mt-12 bg-charcoal-800/60 backdrop-blur-sm rounded-2xl border border-charcoal-700/50 p-6 md:p-8 text-center">
                    <h3 className="text-lg md:text-xl font-heading font-bold text-white mb-2">
                        Still have questions?
                    </h3>
                    <p className="text-charcoal-400 mb-6">
                        We're here to help! Reach out to us via Viber or WhatsApp for quick assistance.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={viberUrl}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#7360f2] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Message us on Viber
                        </a>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Message us on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
