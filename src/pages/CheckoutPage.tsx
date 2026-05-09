import { useNavigate } from 'react-router';
import { useCartContext } from '@/lib/cart-context';
import Checkout from '@/components/Checkout';
import Header from '@/sections/Header';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice } = useCartContext();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <Checkout
          cartItems={cartItems}
          totalPrice={getTotalPrice()}
          onBack={() => navigate('/cart')}
        />
      </main>
    </div>
  );
}
