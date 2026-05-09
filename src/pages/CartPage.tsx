import { useNavigate } from 'react-router';
import { useCartContext } from '@/lib/cart-context';
import Cart from '@/components/Cart';
import Header from '@/sections/Header';

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCartContext();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <Cart
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          getTotalPrice={getTotalPrice}
          onContinueShopping={() => navigate('/catalog')}
          onCheckout={() => navigate('/checkout')}
        />
      </main>
    </div>
  );
}
