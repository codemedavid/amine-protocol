import { useState } from 'react';
import { ShoppingCart, Eye, Plus, Minus } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useMenu } from '@/hooks/useMenu';
import { useCategories } from '@/hooks/useCategories';
import { useCartContext } from '@/lib/cart-context';
import type { Product, ProductVariation } from '@/types';

const peso = (n: number) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 2 }).format(n);

function effectivePrice(product: Product, variation?: ProductVariation) {
  if (variation) {
    return variation.discount_active && variation.discount_price ? variation.discount_price : variation.price;
  }
  return product.discount_active && product.discount_price ? product.discount_price : product.base_price;
}

function startingPrice(product: Product) {
  if (product.variations && product.variations.length > 0) {
    return Math.min(...product.variations.map((v) => effectivePrice(product, v)));
  }
  return effectivePrice(product);
}

export default function ProductGrid() {
  const { products, loading, error } = useMenu();
  const { categories } = useCategories();
  const { addToCart } = useCartContext();

  const categoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? id;
  const [selected, setSelected] = useState<Product | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>();
  const [qty, setQty] = useState(1);

  const openDetails = (product: Product) => {
    setSelected(product);
    setSelectedVariation(product.variations?.[0]);
    setQty(1);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, product.variations?.[0], 1);
  };

  const handleAddFromSheet = () => {
    if (!selected) return;
    addToCart(selected, selectedVariation, qty);
    setSelected(null);
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-gradient-to-b from-accent-light/50 to-white" id="shop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3">Popular Peptides</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Frequently requested compounds with documented batch verification.
            </p>
          </div>
        </ScrollReveal>

        {loading && (
          <div className="text-center text-muted-foreground py-12">Loading products…</div>
        )}
        {error && !loading && (
          <div className="text-center text-red-600 py-12">Failed to load products: {error}</div>
        )}
        {!loading && !error && products.length === 0 && (
          <div className="text-center text-muted-foreground py-12">No products available yet.</div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {products.map((product, i) => {
            const price = startingPrice(product);
            const outOfStock = product.stock_quantity === 0 && (!product.variations || product.variations.every((v) => v.stock_quantity === 0));
            return (
              <ScrollReveal key={product.id} delay={i * 0.05}>
                <div
                  onClick={() => openDetails(product)}
                  className="group cursor-pointer bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="relative bg-gradient-to-b from-accent-light/30 to-white p-6 flex items-center justify-center h-52 overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="max-h-40 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-muted-foreground text-xs">No image</div>
                    )}
                    {product.discount_active && product.discount_price && (
                      <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-red-500 text-white px-2 py-1 rounded-full">
                        Sale
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <span className="inline-block text-[11px] font-medium text-secondary bg-accent-light/50 px-2.5 py-1 rounded-full mb-2">
                      {categoryName(product.category)}
                    </span>
                    <h3 className="font-semibold text-primary text-sm mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      From <span className="font-semibold text-primary">{peso(price)}</span>
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.purity_percentage > 0 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-light text-secondary border border-accent">
                          ≥{product.purity_percentage}% Purity
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-light text-secondary border border-accent">
                        Third Party Tested
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); openDetails(product); }}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
                      >
                        <Eye className="w-4 h-4" />
                        Details
                      </button>
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        disabled={outOfStock}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-primary bg-primary text-white text-sm font-medium hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {outOfStock ? 'Sold out' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto rounded-t-3xl">
          {selected && (
            <>
              <div className="mx-auto w-12 h-1.5 bg-gray-200 rounded-full mt-2" />
              <SheetHeader className="px-2">
                <SheetTitle className="text-xl text-primary">{selected.name}</SheetTitle>
                <SheetDescription className="text-secondary">{categoryName(selected.category)}</SheetDescription>
              </SheetHeader>

              <div className="max-w-3xl mx-auto w-full px-4 pb-8 grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-b from-accent-light/30 to-white rounded-2xl flex items-center justify-center h-64 md:h-full">
                  {selected.image_url ? (
                    <img src={selected.image_url} alt={selected.name} className="max-h-56 w-auto object-contain" />
                  ) : (
                    <div className="text-muted-foreground text-sm">No image</div>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {peso(effectivePrice(selected, selectedVariation))}
                    </p>
                    {selected.description && (
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{selected.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {selected.purity_percentage > 0 && (
                      <Spec label="Purity" value={`≥${selected.purity_percentage}%`} />
                    )}
                    {selected.molecular_weight && <Spec label="Mol. Weight" value={selected.molecular_weight} />}
                    {selected.cas_number && <Spec label="CAS #" value={selected.cas_number} />}
                    {selected.sequence && <Spec label="Sequence" value={selected.sequence} />}
                    {selected.storage_conditions && <Spec label="Storage" value={selected.storage_conditions} />}
                  </div>

                  {selected.variations && selected.variations.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">Size</p>
                      <div className="flex flex-wrap gap-2">
                        {selected.variations.map((v) => {
                          const active = selectedVariation?.id === v.id;
                          return (
                            <button
                              key={v.id}
                              onClick={() => setSelectedVariation(v)}
                              disabled={v.stock_quantity === 0}
                              className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                                active
                                  ? 'bg-primary text-white border-primary'
                                  : 'bg-white text-primary border-gray-200 hover:border-primary'
                              } disabled:opacity-40 disabled:cursor-not-allowed`}
                            >
                              {v.name} · {peso(effectivePrice(selected, v))}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">Qty</p>
                    <div className="flex items-center border border-gray-200 rounded-full">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="p-2 hover:bg-gray-100 rounded-l-full"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-sm font-semibold w-8 text-center">{qty}</span>
                      <button
                        onClick={() => setQty((q) => q + 1)}
                        className="p-2 hover:bg-gray-100 rounded-r-full"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddFromSheet}
                    className="w-full rounded-full bg-primary hover:bg-primary-light text-white py-6 text-base"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to cart · {peso(effectivePrice(selected, selectedVariation) * qty)}
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-accent-light/40 rounded-lg px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-xs font-semibold text-primary truncate">{value}</p>
    </div>
  );
}
