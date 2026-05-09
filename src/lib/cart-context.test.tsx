import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCartContext } from './cart-context';
import type { Product } from '../types';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const product: Product = {
  id: 'p1',
  name: 'Test',
  description: '',
  category: 'misc',
  base_price: 10,
  discount_price: null,
  discount_active: false,
  purity_percentage: 99,
  molecular_weight: null,
  cas_number: null,
  sequence: null,
  storage_conditions: '',
  inclusions: null,
  stock_quantity: 5,
  available: true,
  featured: false,
  image_url: null,
  safety_sheet_url: null,
  created_at: '',
  updated_at: '',
} as unknown as Product;

describe('CartProvider', () => {
  it('exposes cart state to consumers', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });
    expect(result.current.getTotalItems()).toBe(0);
    act(() => result.current.addToCart(product, undefined, 1));
    expect(result.current.getTotalItems()).toBe(1);
  });

  it('throws when used outside provider', () => {
    expect(() => renderHook(() => useCartContext())).toThrow(/CartProvider/);
  });
});
