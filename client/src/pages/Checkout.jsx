import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Truck, Gift, ChevronRight, Check, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { createOrder } from '../utils/api';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';

const STEPS = ['Cart Review', 'Customer Info', 'Payment'];

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' });
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 999 ? 0 : 80;
  const total = subtotal - discount + shipping;
  const freeGift = paymentMethod !== 'cod' && total >= 1000;

  const applyCoupon = () => {
    if (coupon === 'PREPAID75' && paymentMethod !== 'cod' && subtotal >= 5000) { setDiscount(75); setAppliedCoupon(coupon); toast.success('Coupon applied! ₹75 off'); }
    else if (coupon === 'FIRST10') { const d = Math.round(subtotal * 0.1); setDiscount(d); setAppliedCoupon(coupon); toast.success(`10% off applied! Saving ${formatPrice(d)}`); }
    else toast.error('Invalid or inapplicable coupon');
  };

  const validateStep0 = () => items.length > 0;
  const validateStep1 = () => form.name && form.email && form.phone && form.address && form.city && form.pincode;

  const placeOrder = async () => {
    if (!validateStep1()) { toast.error('Please fill all required fields'); return; }
    setLoading(true);
    try {
      const order = await createOrder({
        items: items.map(i => ({ id: i.product.id, name: i.product.name, price: i.price, qty: i.qty, variant: i.variant?.label })),
        customer: { name: form.name, email: form.email, phone: form.phone },
        address: { line1: form.address, city: form.city, state: form.state, pincode: form.pincode },
        paymentMethod, couponCode: appliedCoupon || null,
      });
      clearCart();
      navigate('/order-success', { state: { order: order.order } });
    } catch { toast.error('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  if (items.length === 0 && step < 2) return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">🛒</div>
      <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
      <p className="text-dark-300 mb-6">Add some products before checking out</p>
      <Link to="/catalog" className="btn-primary">Browse Products</Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="section-title mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${i === step ? 'bg-brand-500/20 text-brand-400' : i < step ? 'text-green-400' : 'text-dark-400'}`}>
              {i < step ? <Check size={16} /> : <span className="w-5 h-5 rounded-full bg-dark-700 text-xs flex items-center justify-center">{i + 1}</span>}
              {s}
            </div>
            {i < STEPS.length - 1 && <ChevronRight size={14} className="text-dark-600" />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Step 0: Cart Review */}
          {step === 0 && (
            <div className="card p-6">
              <h2 className="font-semibold text-white text-lg mb-4">Review Your Order</h2>
              {items.map(item => (
                <div key={item.key} className="flex gap-4 py-4 border-b border-dark-700 last:border-0">
                  <img src={item.product.thumbnail} alt={item.product.name} className="w-16 h-16 object-cover rounded-xl bg-dark-700 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-white font-medium">{item.product.name}</div>
                    {item.variant && <div className="text-dark-400 text-sm">{item.variant.label}</div>}
                    <div className="flex items-center justify-between mt-1">
                      <div className="text-dark-300 text-sm">Qty: {item.qty}</div>
                      <div className="text-brand-400 font-bold">{formatPrice(item.price * item.qty)}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon */}
              <div className="mt-4 flex gap-2">
                <input value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())} placeholder="Coupon code (e.g. PREPAID75)" className="input-field flex-1 text-sm" />
                <button onClick={applyCoupon} className="btn-secondary text-sm px-4">Apply</button>
              </div>
              {appliedCoupon && <div className="text-green-400 text-sm mt-2 flex items-center gap-1"><Check size={14} /> {appliedCoupon} applied — saving {formatPrice(discount)}</div>}

              <button onClick={() => setStep(1)} disabled={!validateStep0()} className="btn-primary w-full mt-6">Continue to Delivery Info <ChevronRight size={18} /></button>
            </div>
          )}

          {/* Step 1: Customer Info */}
          {step === 1 && (
            <div className="card p-6">
              <h2 className="font-semibold text-white text-lg mb-4">Delivery Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-dark-300 text-sm mb-1 block">Full Name *</label>
                  <input value={form.name} onChange={e => setField('name', e.target.value)} placeholder="Your full name" className="input-field" />
                </div>
                <div>
                  <label className="text-dark-300 text-sm mb-1 block">Email *</label>
                  <input type="email" value={form.email} onChange={e => setField('email', e.target.value)} placeholder="email@example.com" className="input-field" />
                </div>
                <div>
                  <label className="text-dark-300 text-sm mb-1 block">Phone *</label>
                  <input type="tel" value={form.phone} onChange={e => setField('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className="input-field" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-dark-300 text-sm mb-1 block">Address *</label>
                  <textarea value={form.address} onChange={e => setField('address', e.target.value)} placeholder="House no., Street, Area" rows={3} className="input-field resize-none" />
                </div>
                <div>
                  <label className="text-dark-300 text-sm mb-1 block">City *</label>
                  <input value={form.city} onChange={e => setField('city', e.target.value)} placeholder="City" className="input-field" />
                </div>
                <div>
                  <label className="text-dark-300 text-sm mb-1 block">State</label>
                  <input value={form.state} onChange={e => setField('state', e.target.value)} placeholder="State" className="input-field" />
                </div>
                <div>
                  <label className="text-dark-300 text-sm mb-1 block">PIN Code *</label>
                  <input value={form.pincode} onChange={e => setField('pincode', e.target.value)} placeholder="110001" className="input-field" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(0)} className="btn-secondary">← Back</button>
                <button onClick={() => setStep(2)} disabled={!validateStep1()} className="btn-primary flex-1">Continue to Payment <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="card p-6">
              <h2 className="font-semibold text-white text-lg mb-4">Payment Method</h2>
              <div className="space-y-3 mb-6">
                {[
                  { id: 'upi', label: 'UPI / Google Pay / PhonePe', icon: Smartphone, desc: 'Instant payment via UPI apps' },
                  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, Rupay' },
                  { id: 'netbanking', label: 'Net Banking', icon: Banknote, desc: 'All major banks supported' },
                  { id: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: '₹40 COD charge may apply' },
                ].map(({ id, label, icon: Icon, desc }) => (
                  <label key={id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === id ? 'border-brand-500 bg-brand-500/10' : 'border-dark-600 hover:border-dark-500'}`}>
                    <input type="radio" name="payment" value={id} checked={paymentMethod === id} onChange={() => setPaymentMethod(id)} className="sr-only" />
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === id ? 'bg-brand-500/20 text-brand-400' : 'bg-dark-700 text-dark-300'}`}><Icon size={20} /></div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{label}</div>
                      <div className="text-dark-400 text-sm">{desc}</div>
                    </div>
                    {paymentMethod === id && <Check size={18} className="text-brand-400" />}
                  </label>
                ))}
              </div>

              {paymentMethod !== 'cod' && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl mb-6 text-sm">
                  🎁 <span className="text-green-400 font-semibold">Prepaid offer:</span> <span className="text-dark-200">FREE gift + use PREPAID75 for ₹75 off on ₹5000+</span>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary">← Back</button>
                <button onClick={placeOrder} disabled={loading} className="btn-primary flex-1 py-4 text-base">
                  {loading ? 'Placing Order...' : `Place Order — ${formatPrice(total)}`}
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 mt-3 text-dark-400 text-xs">
                <Shield size={12} /> Secure 256-bit SSL encrypted payment
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="card p-5 h-fit sticky top-24">
          <h3 className="font-semibold text-white mb-4">Order Summary</h3>
          {items.map(item => (
            <div key={item.key} className="flex justify-between text-sm py-1.5">
              <span className="text-dark-300 line-clamp-1 max-w-[180px]">{item.product.name} × {item.qty}</span>
              <span className="text-white font-medium">{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
          <div className="border-t border-dark-700 mt-3 pt-3 space-y-2">
            <div className="flex justify-between text-sm text-dark-300"><span>Subtotal</span><span className="text-white">{formatPrice(subtotal)}</span></div>
            {discount > 0 && <div className="flex justify-between text-sm text-green-400"><span>Discount</span><span>−{formatPrice(discount)}</span></div>}
            <div className="flex justify-between text-sm text-dark-300">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'text-green-400 font-semibold' : 'text-white'}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
            </div>
            {freeGift && <div className="flex justify-between text-sm text-green-400"><span>🎁 Free Gift</span><span>Included!</span></div>}
            <div className="flex justify-between font-bold text-white text-lg border-t border-dark-700 pt-2 mt-2">
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {[Shield, Truck, Gift].map((Icon, i) => (
              <div key={i} className="flex items-center gap-2 text-dark-400 text-xs">
                <Icon size={12} />
                <span>{['100% authentic products', 'Free shipping on ₹999+', 'Free gift on prepaid'][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
