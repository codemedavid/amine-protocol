import { createContext, useContext, type ReactNode } from 'react';
import { useCart } from '../hooks/useCart';

type CartValue = ReturnType<typeof useCart>;

const CartCtx = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart();
  return <CartCtx.Provider value={cart}>{children}</CartCtx.Provider>;
}

export function useCartContext(): CartValue {
  const v = useContext(CartCtx);
  if (!v) throw new Error('useCartContext must be used inside <CartProvider>');
  return v;
}
