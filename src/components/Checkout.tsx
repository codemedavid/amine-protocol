import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Package, CreditCard, Activity, Copy, Check, MessageCircle, Tag, Upload, Database, Lock, Truck } from 'lucide-react';
import type { CartItem } from '@/types';
import { usePaymentMethods } from '@/hooks/usePaymentMethods';
import { useShippingLocations } from '@/hooks/useShippingLocations';
import { useCouriers } from '@/hooks/useCouriers';
import { supabase } from '@/lib/supabase';
import { useImageUpload } from '@/hooks/useImageUpload';
import posthog from '@/lib/posthog';

interface CheckoutProps {
  cartItems: CartItem[];
  totalPrice: number;
  onBack: () => void;
}

const inputCls = 'w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all text-sm text-primary placeholder:text-gray-400';
const cardCls = 'bg-white rounded-xl p-6 border border-gray-100 shadow-card';
const labelCls = 'block text-xs font-bold text-secondary uppercase tracking-wide mb-2';

const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalPrice, onBack }) => {
  const { paymentMethods } = usePaymentMethods();
  const { locations: shippingLocations } = useShippingLocations();
  const { couriers } = useCouriers();
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [address, setAddress] = useState('');
  const [barangay, setBarangay] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [selectedCourierId, setSelectedCourierId] = useState('');
  const [shippingLocation, setShippingLocation] = useState<string>('');

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [contactMethod, setContactMethod] = useState<'viber' | 'whatsapp' | ''>('viber');
  const [notes, setNotes] = useState('');

  const [orderMessage, setOrderMessage] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const { uploadImage, uploading: isUploadingProof } = useImageUpload('payment-proofs');

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  React.useEffect(() => {
    if (paymentMethods.length > 0 && !selectedPaymentMethod) {
      setSelectedPaymentMethod(paymentMethods[0].id);
    }
  }, [paymentMethods, selectedPaymentMethod]);

  const selectedLocation = shippingLocations.find(loc => loc.id === shippingLocation);
  const shippingFee = selectedLocation ? selectedLocation.fee : 0;
  const finalTotal = Math.max(0, totalPrice + shippingFee - discountAmount);

  const handleApplyPromoCode = async () => {
    setPromoError('');
    setPromoSuccess('');
    setAppliedPromo(null);
    setDiscountAmount(0);

    const code = promoCode.trim().toUpperCase();
    if (!code) { setPromoError('Please enter a promo code'); return; }
    if (!supabase) { setPromoError('Service unavailable'); return; }

    setIsApplyingPromo(true);
    try {
      const { data: promo, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', code)
        .eq('active', true)
        .single();

      if (error || !promo) { setPromoError('Invalid or inactive promo code'); return; }

      const now = new Date();
      if (promo.start_date && new Date(promo.start_date) > now) { setPromoError('Promo code is not yet valid'); return; }
      if (promo.end_date && new Date(promo.end_date) < now) { setPromoError('Promo code has expired'); return; }
      if (promo.usage_limit && promo.usage_count >= promo.usage_limit) { setPromoError('Promo code usage limit reached'); return; }
      if (totalPrice < promo.min_purchase_amount) { setPromoError(`Minimum purchase of ₱${promo.min_purchase_amount} required`); return; }

      let discount = 0;
      if (promo.discount_type === 'percentage') {
        discount = (totalPrice * promo.discount_value) / 100;
        if (promo.max_discount_amount) discount = Math.min(discount, promo.max_discount_amount);
      } else {
        discount = promo.discount_value;
      }
      discount = Math.min(discount, totalPrice);

      setDiscountAmount(discount);
      setAppliedPromo(promo);
      setPromoSuccess(`Promo applied! You saved ₱${discount.toLocaleString()}`);
    } catch (err) {
      console.error('Error applying promo:', err);
      setPromoError('Failed to apply promo code');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const isDetailsValid =
    fullName.trim() !== '' &&
    email.trim() !== '' &&
    phone.trim() !== '' &&
    address.trim() !== '' &&
    barangay.trim() !== '' &&
    city.trim() !== '' &&
    state.trim() !== '' &&
    zipCode.trim() !== '' &&
    selectedCourierId !== '' &&
    shippingLocation !== '';

  const handlePlaceOrder = async () => {
    if (!contactMethod) { alert('Please select your preferred contact method.'); return; }
    if (!shippingLocation) { alert('Please select your shipping location.'); return; }
    if (!paymentProof) { alert('Please upload a screenshot of your payment proof to proceed.'); return; }
    if (!supabase) { alert('Service unavailable. Please try again later.'); return; }

    const paymentMethod = paymentMethods.find(pm => pm.id === selectedPaymentMethod);

    try {
      let paymentProofUrl = null;
      if (paymentProof) {
        try {
          paymentProofUrl = await uploadImage(paymentProof);
        } catch (uploadError: any) {
          alert(`Failed to upload payment proof: ${uploadError.message}`);
          return;
        }
      }

      const orderItems = cartItems.map(item => {
        const basePrice = item.variation ? item.variation.price : item.product.base_price;
        let currentPrice = basePrice;
        const isDiscounted = item.variation
          ? (item.variation.discount_active && item.variation.discount_price !== null && item.variation.discount_price < basePrice)
          : (item.product.discount_active && item.product.discount_price !== null && item.product.discount_price < item.product.base_price);
        if (isDiscounted) currentPrice = item.variation?.discount_price || item.product.discount_price || basePrice;
        return {
          product_id: item.product.id,
          product_name: item.product.name,
          variation_id: item.variation?.id || null,
          variation_name: item.variation?.name || null,
          quantity: item.quantity,
          price: currentPrice,
          total: currentPrice * item.quantity,
          purity_percentage: item.product.purity_percentage,
        };
      });

      const randomDigits = Math.floor(Math.random() * 9000 + 1000);
      const customOrderNumber = `TBS-${randomDigits}`;

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_name: fullName,
          customer_email: email,
          customer_phone: phone,
          shipping_address: address,
          shipping_barangay: barangay,
          shipping_city: city,
          shipping_state: state,
          shipping_zip_code: zipCode,
          order_items: orderItems,
          total_price: Math.max(0, totalPrice - discountAmount),
          shipping_fee: shippingFee,
          courier_id: selectedCourierId || null,
          shipping_location: shippingLocation,
          payment_method_id: paymentMethod?.id || null,
          payment_method_name: paymentMethod?.name || null,
          payment_proof_url: paymentProofUrl,
          contact_method: contactMethod || null,
          notes: notes.trim() || null,
          order_status: 'new',
          payment_status: 'pending',
          promo_code_id: appliedPromo?.id || null,
          promo_code: appliedPromo?.code || null,
          discount_applied: discountAmount,
          order_number: customOrderNumber,
        }])
        .select()
        .single();

      if (orderError) {
        let errorMessage = orderError.message;
        if (orderError.message?.includes('relation "public.orders" does not exist') || orderError.message?.includes('schema cache')) {
          errorMessage = `The orders table doesn't exist. Please run the migration.`;
        }
        alert(`Failed to save order: ${errorMessage}`);
        return;
      }

      if (appliedPromo) {
        await supabase
          .from('promo_codes')
          .update({ usage_count: appliedPromo.usage_count + 1 })
          .eq('id', appliedPromo.id);
      }

      const items_description = orderItems.map(item =>
        `${item.quantity}x ${item.product_name}${item.variation_name ? ` - ${item.variation_name}` : ''} (₱${item.price.toLocaleString('en-PH', { minimumFractionDigits: 2 })})`
      ).join('\n');

      posthog.capture('tbs_order_placed', {
        order_number: customOrderNumber,
        order_id: orderData?.id,
        email,
        customer_name: fullName,
        total_price: Math.max(0, totalPrice - discountAmount),
        shipping_fee: shippingFee,
        item_count: orderItems.length,
        items_description,
        payment_method: paymentMethod?.name,
        promo_code: appliedPromo?.code || null,
        discount_applied: discountAmount,
      });

      setOrderNumber(customOrderNumber);

      const now = new Date();
      const dateTimeStamp = now.toLocaleString('en-PH', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
      });

      const orderDetails = `
✨ THE AMINE PROTOCOL - NEW ORDER

📅 ORDER DATE & TIME
${dateTimeStamp}

👤 CUSTOMER INFORMATION
Name: ${fullName}
Email: ${email}
Phone: ${phone}

📦 SHIPPING ADDRESS
${address}
${barangay}
${city}, ${state} ${zipCode}
Courier: ${couriers.find(c => c.id === selectedCourierId)?.name || 'N/A'}

🛒 ORDER DETAILS
${cartItems.map(item => {
        let line = `• ${item.product.name}`;
        if (item.variation) line += ` (${item.variation.name})`;
        const basePrice = item.variation ? item.variation.price : item.product.base_price;
        let currentPrice = basePrice;
        const isDiscounted = item.variation
          ? (item.variation.discount_active && item.variation.discount_price !== null && item.variation.discount_price < basePrice)
          : (item.product.discount_active && item.product.discount_price !== null && item.product.discount_price < item.product.base_price);
        if (isDiscounted) currentPrice = item.variation?.discount_price || item.product.discount_price || basePrice;
        line += ` x${item.quantity} - ₱${(currentPrice * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 0 })}`;
        if (item.product.purity_percentage && item.product.purity_percentage > 0) line += `\n  Purity: ${item.product.purity_percentage}%`;
        return line;
      }).join('\n\n')}

💰 PRICING
Product Total: ₱${totalPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
Shipping Fee: ₱${shippingFee.toLocaleString('en-PH', { minimumFractionDigits: 0 })} (${shippingLocation.replace('_', ' & ')})
${discountAmount > 0 ? `Discount (${appliedPromo?.code}): -₱${discountAmount.toLocaleString('en-PH', { minimumFractionDigits: 0 })}\n` : ''}Grand Total: ₱${finalTotal.toLocaleString('en-PH', { minimumFractionDigits: 0 })}

💳 PAYMENT METHOD
${paymentMethod?.name || 'N/A'}
${paymentMethod ? `Account: ${paymentMethod.account_number}` : ''}

📸 PROOF OF PAYMENT
${paymentProofUrl ? 'Screenshot attached to order.' : 'Pending'}

📱 CONTACT METHOD
${contactMethod === 'viber' ? 'Viber (0949 613 3242)' : 'WhatsApp (0949 613 3242)'}

📋 ORDER NUMBER: ${customOrderNumber}

Please confirm this order. Thank you!
      `.trim();

      setOrderMessage(orderDetails);

      try {
        await navigator.clipboard.writeText(orderDetails);
        setCopied(true);
      } catch {
        // clipboard not available
      }

      setStep('confirmation');
    } catch (error) {
      console.error('Error placing order:', error);
      alert(`Failed to place order: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(orderMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      alert('Failed to copy. Please manually select and copy the message.');
    }
  };

  const handleOpenContact = () => {
    const contactUrl = contactMethod === 'viber'
      ? `viber://chat?number=639496133242&text=${encodeURIComponent(orderMessage)}`
      : contactMethod === 'whatsapp'
        ? `https://wa.me/639496133242?text=${encodeURIComponent(orderMessage)}`
        : null;
    if (contactUrl) {
      if (contactMethod === 'viber') window.location.href = contactUrl;
      else window.open(contactUrl, '_blank');
    }
  };

  // ─── Confirmation Step ────────────────────────────────────────────────────
  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className={`${cardCls} text-center`}>
            <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-12 h-12 text-emerald-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Order Confirmed</h1>
            <p className="text-muted-foreground mb-4 text-base md:text-lg leading-relaxed">
              Copy the order message below and send it via {contactMethod === 'viber' ? 'Viber' : 'WhatsApp'} along with your payment screenshot to finalize your order.
            </p>

            {orderNumber && (
              <div className="bg-accent-light border border-accent rounded-xl p-4 mb-6">
                <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Order Reference</p>
                <p className="text-2xl font-bold text-primary font-mono">{orderNumber}</p>
                <p className="text-xs text-muted-foreground mt-2">Use this reference for tracking and support</p>
              </div>
            )}

            <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-primary flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-secondary" />
                  Order Details
                </h3>
                <button
                  onClick={handleCopyMessage}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-full font-medium transition-all text-sm"
                >
                  {copied ? <><Check className="w-4 h-4" />Copied!</> : <><Copy className="w-4 h-4" />Copy</>}
                </button>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-100 max-h-64 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-primary font-mono">{orderMessage}</pre>
              </div>
              {copied && (
                <p className="text-emerald-600 text-sm mt-2 flex items-center gap-1 font-medium">
                  <Check className="w-4 h-4" />Copied to clipboard! Ready to send.
                </p>
              )}
            </div>

            <div className="space-y-3 mb-8">
              <button
                onClick={handleOpenContact}
                className="w-full bg-secondary hover:bg-secondary-dark text-white font-semibold py-4 text-base flex items-center justify-center gap-2 shadow-lg rounded-full transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                {contactMethod === 'viber' ? 'Open Viber' : 'Open WhatsApp'} & Send
              </button>
            </div>

            <div className="bg-accent-light rounded-xl p-6 mb-8 text-left border border-accent">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-secondary" />
                Next Steps
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  'Confirmation within 24 hours of payment receipt.',
                  'Research-grade packaging and secure handling.',
                  'Same-day shipping for verified payments before 11 AM.',
                  'Tracking details sent via your selected contact method after dispatch.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-bold text-secondary">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => { window.scrollTo({ top: 0 }); window.location.href = '/'; }}
              className="w-full border border-gray-200 text-primary font-medium py-3 flex items-center justify-center gap-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Payment Step ─────────────────────────────────────────────────────────
  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-white py-6 md:py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <button
            onClick={() => setStep('details')}
            className="text-muted-foreground hover:text-secondary font-medium mb-6 flex items-center gap-2 transition-colors group text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Details
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8 flex items-center gap-3">
            Payment & Verification
            <Lock className="w-6 h-6 text-secondary" />
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Methods */}
              <div className={cardCls}>
                <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-secondary" />
                  Select Payment Method
                </h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id}>
                      <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${selectedPaymentMethod === method.id ? 'border-secondary bg-accent-light ring-1 ring-secondary' : 'border-gray-200 hover:border-secondary/50'}`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={selectedPaymentMethod === method.id}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            className="text-secondary focus:ring-secondary"
                          />
                          <div className="flex-1">
                            <p className="font-bold text-primary">{method.name}</p>
                            <p className="text-sm text-muted-foreground font-mono mt-1">{method.account_number}</p>
                            {method.account_name && <p className="text-xs text-muted-foreground mt-0.5">Account: {method.account_name}</p>}
                          </div>
                        </div>
                      </label>
                      {selectedPaymentMethod === method.id && method.qr_code_url && (
                        <div className="mt-2 ml-8 mb-4 p-4 bg-gray-50 border border-gray-100 rounded-xl">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 text-center">Scan to Pay</p>
                          <div className="flex justify-center">
                            <img src={method.qr_code_url} alt={`${method.name} QR Code`} className="max-w-[200px] w-full h-auto rounded-lg border border-gray-100" />
                          </div>
                          <p className="text-xs text-center text-muted-foreground mt-2">Screenshot your payment and upload it below</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Proof Upload */}
              <div className={cardCls}>
                <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-secondary" />
                  Upload Proof of Payment
                </h2>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-secondary/50 transition-colors bg-gray-50">
                  <input type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) setPaymentProof(e.target.files[0]); }} className="hidden" id="payment-proof-upload" />
                  <label htmlFor="payment-proof-upload" className="cursor-pointer flex flex-col items-center">
                    {paymentProof ? (
                      <>
                        <Check className="w-12 h-12 text-emerald-600 mb-3" />
                        <p className="font-medium text-primary">{paymentProof.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">Click to change file</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-muted-foreground mb-3" />
                        <p className="font-medium text-primary">Click to upload screenshot</p>
                        <p className="text-xs text-muted-foreground mt-1">GCash/Bank transfer receipt</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div className={cardCls}>
                <h2 className="text-lg font-bold text-primary mb-4">Additional Notes (Optional)</h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`${inputCls} h-24 resize-none`}
                  placeholder="Special instructions for delivery..."
                />
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!paymentProof || isUploadingProof}
                className="w-full bg-secondary hover:bg-secondary-dark disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-4 text-base rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isUploadingProof ? 'Uploading Proof...' : 'Complete Order'}
              </button>
            </div>

            {/* Payment Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className={`${cardCls} sticky top-24`}>
                <h3 className="font-bold text-primary mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  {cartItems.map((item, idx) => {
                    const basePrice = item.variation ? item.variation.price : item.product.base_price;
                    let currentPrice = basePrice;
                    const isDiscounted = item.variation
                      ? (item.variation.discount_active && item.variation.discount_price !== null && item.variation.discount_price < basePrice)
                      : (item.product.discount_active && item.product.discount_price !== null && item.product.discount_price < item.product.base_price);
                    if (isDiscounted) currentPrice = item.variation?.discount_price || item.product.discount_price || basePrice;
                    return (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.quantity}x {item.product.name}</span>
                        <span className="font-medium text-primary">₱{(currentPrice * item.quantity).toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-primary">₱{totalPrice.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-primary">₱{shippingFee.toLocaleString()}</span></div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount</span><span>-₱{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-primary text-lg pt-2 border-t border-gray-100">
                    <span>Total</span><span className="text-secondary">₱{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Details Step ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white py-6 md:py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={onBack}
          className="text-muted-foreground hover:text-secondary font-medium mb-6 flex items-center gap-2 transition-colors group text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8 flex items-center gap-3">
          Checkout Information
          <Activity className="w-6 h-6 text-secondary" />
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <div className={cardCls}>
              <h2 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                <div className="bg-accent-light p-2 rounded-lg text-secondary"><Package className="w-5 h-5" /></div>
                Customer Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className={labelCls}>Full Name *</label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} placeholder="Juan Dela Cruz" required />
                </div>
                <div>
                  <label className={labelCls}>Email Address *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="juan@example.com" required />
                </div>
                <div>
                  <label className={labelCls}>Phone Number *</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} placeholder="09XX XXX XXXX" required />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className={cardCls}>
              <h2 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                <div className="bg-accent-light p-2 rounded-lg text-secondary"><Database className="w-5 h-5" /></div>
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Street Address *</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls} placeholder="House/Unit, Street Name" required />
                </div>
                <div>
                  <label className={labelCls}>Barangay *</label>
                  <input type="text" value={barangay} onChange={(e) => setBarangay(e.target.value)} className={inputCls} placeholder="Brgy. Name" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>City *</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className={inputCls} placeholder="City" required />
                  </div>
                  <div>
                    <label className={labelCls}>Province *</label>
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} className={inputCls} placeholder="Province" required />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>ZIP/Postal Code *</label>
                  <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className={inputCls} placeholder="ZIP Code" required />
                </div>
              </div>
            </div>

            {/* Courier Selection */}
            <div className={cardCls}>
              <h2 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-secondary" />
                Select Courier Provider *
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {couriers.filter(c => c.is_active).map((courier) => (
                  <button
                    key={courier.id}
                    onClick={() => { setSelectedCourierId(courier.id); setShippingLocation(''); }}
                    className={`p-4 rounded-xl border transition-all text-left ${selectedCourierId === courier.id ? 'border-secondary bg-accent-light ring-1 ring-secondary' : 'border-gray-200 hover:border-secondary/50'}`}
                  >
                    <div className="font-bold text-primary text-sm">{courier.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Shipping Location */}
            <div className={`${cardCls} transition-opacity duration-300 ${!selectedCourierId ? 'opacity-50 pointer-events-none' : ''}`}>
              <h2 className="text-lg font-bold text-primary mb-3">Choose Shipping Region *</h2>
              <p className="text-xs text-muted-foreground mb-4 bg-accent-light p-3 rounded-lg border border-accent">
                {selectedCourierId ? 'Select the rate applicable to your location.' : 'Please select a courier provider above first.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {shippingLocations
                  .filter(loc => {
                    if (!selectedCourierId) return false;
                    const courier = couriers.find(c => c.id === selectedCourierId);
                    if (!courier) return false;
                    const code = courier.code.toLowerCase();
                    return loc.id.toLowerCase().includes(code) || loc.name.toLowerCase().includes(code);
                  })
                  .map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => setShippingLocation(loc.id)}
                      className={`p-4 rounded-xl border transition-all text-left ${shippingLocation === loc.id ? 'border-secondary bg-accent-light ring-1 ring-secondary' : 'border-gray-200 hover:border-secondary/50'}`}
                    >
                      <p className="font-bold text-primary text-sm mb-1">{loc.name || loc.id.replace('_', ' & ')}</p>
                      <p className="text-xs text-secondary font-medium">₱{loc.fee}</p>
                    </button>
                  ))}
              </div>
            </div>

            {/* Contact Method */}
            <div className={cardCls}>
              <h2 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-secondary" />
                Contact Method *
              </h2>
              <p className="text-xs text-muted-foreground mb-4">Choose how you'd like to send your order details after checkout.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setContactMethod('viber')}
                  className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${contactMethod === 'viber' ? 'border-secondary bg-accent-light ring-1 ring-secondary' : 'border-gray-200 hover:border-secondary/50'}`}
                >
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.624 19.344C20.618 20.35 18.257 21.018 17.653 21.119C16.921 21.238 16.331 21.229 15.776 21.161C14.075 20.957 11.836 20.065 9.421 17.652C7.008 15.236 6.115 12.997 5.912 11.296C5.844 10.741 5.834 10.151 5.953 9.419C6.054 8.815 6.722 6.453 7.728 5.447C8.016 5.16 8.441 5.152 8.74 5.433C9.098 5.769 9.873 6.643 10.233 7.072C10.518 7.411 10.518 7.904 10.247 8.249C9.972 8.6 9.497 9.062 9.165 9.387C9.049 9.501 8.981 9.658 9.04 9.813C9.28 10.439 10.057 12.164 11.889 13.996C13.722 15.828 15.447 16.604 16.073 16.844C16.228 16.904 16.386 16.836 16.499 16.719C16.825 16.388 17.286 15.912 17.638 15.637C17.982 15.366 18.475 15.367 18.814 15.652C19.243 16.012 20.117 16.787 20.453 17.145C20.733 17.444 20.726 17.869 20.439 18.156L21.624 19.344Z" />
                  </svg>
                  <div className="text-left">
                    <p className="font-bold text-primary text-sm">Viber</p>
                    <p className="text-xs text-muted-foreground">0949 613 3242</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('whatsapp')}
                  className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${contactMethod === 'whatsapp' ? 'border-secondary bg-accent-light ring-1 ring-secondary' : 'border-gray-200 hover:border-secondary/50'}`}
                >
                  <div className="w-6 h-6 flex items-center justify-center bg-green-500 rounded-full text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-primary text-sm">WhatsApp</p>
                    <p className="text-xs text-muted-foreground">0949 613 3242</p>
                  </div>
                </button>
              </div>
            </div>

            <button
              onClick={() => isDetailsValid && setStep('payment')}
              disabled={!isDetailsValid}
              className={`w-full py-4 rounded-full font-bold text-base transition-all shadow-md ${isDetailsValid ? 'bg-secondary hover:bg-secondary-dark text-white hover:scale-[1.01]' : 'bg-gray-100 text-muted-foreground cursor-not-allowed'}`}
            >
              Proceed to Payment
            </button>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className={`${cardCls} sticky top-24`}>
              <h2 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                Order Summary
                <Activity className="w-4 h-4 text-secondary" />
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => {
                  const basePrice = item.variation ? item.variation.price : item.product.base_price;
                  let currentPrice = basePrice;
                  const isDiscounted = item.variation
                    ? (item.variation.discount_active && item.variation.discount_price !== null && item.variation.discount_price < basePrice)
                    : (item.product.discount_active && item.product.discount_price !== null && item.product.discount_price < item.product.base_price);
                  if (isDiscounted) currentPrice = item.variation?.discount_price || item.product.discount_price || basePrice;
                  return (
                    <div key={index} className="pb-4 border-b border-gray-100">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex-1">
                          <h4 className="font-bold text-primary text-sm">{item.product.name}</h4>
                          {item.variation && <p className="text-xs text-muted-foreground mt-0.5">{item.variation.name}</p>}
                        </div>
                        <span className="font-bold text-primary text-sm">₱{(currentPrice * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 0 })}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  );
                })}
              </div>

              {/* Promo Code */}
              <div className="mb-6 pt-2">
                <p className="text-xs font-bold text-secondary uppercase mb-2 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Promo Code
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="ENTER CODE"
                    className={`${inputCls} flex-1 uppercase`}
                    disabled={!!appliedPromo || isApplyingPromo}
                  />
                  {appliedPromo ? (
                    <button
                      type="button"
                      onClick={() => { setAppliedPromo(null); setDiscountAmount(0); setPromoCode(''); setPromoSuccess(''); }}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold border border-red-100 hover:bg-red-100 shrink-0"
                    >
                      REMOVE
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleApplyPromoCode}
                      disabled={!promoCode || isApplyingPromo}
                      className="px-3 py-2 bg-secondary text-white rounded-lg text-xs font-bold hover:bg-secondary-dark disabled:opacity-50 shrink-0"
                    >
                      APPLY
                    </button>
                  )}
                </div>
                {promoError && <p className="text-red-500 text-xs mt-1">{promoError}</p>}
                {promoSuccess && <p className="text-emerald-600 text-xs mt-1 font-medium">{promoSuccess}</p>}
              </div>

              <div className="space-y-2 text-sm text-muted-foreground border-t border-gray-100 pt-4">
                <div className="flex justify-between"><span>Subtotal</span><span className="text-primary">₱{totalPrice.toLocaleString()}</span></div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span><span>-₱{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-primary text-base pt-2">
                  <span>Total Estimate</span>
                  <span className="text-secondary">₱{Math.max(0, totalPrice - discountAmount).toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground text-right italic">+ Shipping fee added at payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
