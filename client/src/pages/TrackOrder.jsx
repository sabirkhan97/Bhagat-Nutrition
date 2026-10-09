import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Package, CheckCircle, Truck, MapPin, Search } from 'lucide-react';
import { trackOrder } from '../utils/api';
import { formatPrice } from '../utils/helpers';

const STATUS_STEPS = [
  { key: 'confirmed', label: 'Order Confirmed', icon: CheckCircle, desc: 'Your order has been placed and confirmed' },
  { key: 'processing', label: 'Processing', icon: Package, desc: 'Your order is being packed and prepared for dispatch' },
  { key: 'shipped', label: 'Shipped', icon: Truck, desc: 'Your order is on its way to you' },
  { key: 'delivered', label: 'Delivered', icon: MapPin, desc: 'Your order has been delivered' },
];

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('id') || '');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { if (searchParams.get('id')) handleTrack(); }, []);

  const handleTrack = async (e) => {
    e?.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true); setError('');
    try { const data = await trackOrder(orderId.trim()); setOrder(data); }
    catch { setError('Order not found. Please check your Order ID or Tracking ID.'); setOrder(null); }
    finally { setLoading(false); }
  };

  const currentStep = STATUS_STEPS.findIndex(s => s.key === order?.status);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="section-title mb-2">Track Your Order</h1>
        <p className="section-subtitle">Enter your Order ID or Tracking ID to see the status</p>
      </div>

      <form onSubmit={handleTrack} className="flex gap-3 mb-8">
        <input value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="Enter Order ID or Tracking ID (e.g. BN1234567890)"
          className="input-field flex-1" />
        <button type="submit" disabled={loading} className="btn-primary px-6">
          <Search size={18} /> {loading ? 'Searching...' : 'Track'}
        </button>
      </form>

      {error && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center mb-6">{error}</div>}

      {order && (
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex flex-wrap gap-6 mb-6">
              <div><div className="text-dark-400 text-xs uppercase tracking-wide">Order ID</div><div className="text-white font-semibold mt-1">{order.id}</div></div>
              <div><div className="text-dark-400 text-xs uppercase tracking-wide">Tracking ID</div><div className="text-brand-400 font-semibold mt-1">{order.trackingId}</div></div>
              <div><div className="text-dark-400 text-xs uppercase tracking-wide">Total</div><div className="text-white font-semibold mt-1">{formatPrice(order.total)}</div></div>
              <div><div className="text-dark-400 text-xs uppercase tracking-wide">Est. Delivery</div><div className="text-green-400 font-semibold mt-1">{new Date(order.estimatedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div></div>
            </div>

            {/* Progress */}
            <div className="relative">
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-dark-600" />
              <div className="absolute top-5 left-5 h-0.5 bg-brand-500 transition-all" style={{ width: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%` }} />
              <div className="relative flex justify-between">
                {STATUS_STEPS.map((step, i) => {
                  const done = i <= currentStep;
                  return (
                    <div key={step.key} className="flex flex-col items-center gap-2 max-w-[80px] text-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${done ? 'bg-brand-500 text-white' : 'bg-dark-700 text-dark-500 border border-dark-600'}`}>
                        <step.icon size={18} />
                      </div>
                      <div className={`text-xs font-medium ${done ? 'text-white' : 'text-dark-500'}`}>{step.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 p-4 bg-dark-700 rounded-xl">
              <div className="text-white font-semibold">{STATUS_STEPS[currentStep]?.label}</div>
              <div className="text-dark-300 text-sm mt-1">{STATUS_STEPS[currentStep]?.desc}</div>
            </div>
          </div>

          {/* Items */}
          <div className="card p-5">
            <h3 className="font-semibold text-white mb-4">Order Items</h3>
            {order.items?.map((item, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-dark-700 last:border-0 text-sm">
                <span className="text-dark-200">{item.name} {item.variant ? `(${item.variant})` : ''} × {item.qty}</span>
                <span className="text-white font-medium">{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}
          </div>

          {/* Delivery address */}
          <div className="card p-5">
            <h3 className="font-semibold text-white mb-3">Delivery Address</h3>
            <div className="flex gap-3">
              <MapPin size={16} className="text-brand-400 flex-shrink-0 mt-0.5" />
              <div className="text-dark-200 text-sm">
                {order.customer?.name}<br />
                {order.address?.line1}, {order.address?.city} — {order.address?.pincode}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
