import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, MapPin, ArrowRight, Gift } from 'lucide-react';
import { formatPrice } from '../utils/helpers';

export default function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <h2 className="text-white text-2xl font-bold mb-4">No order found</h2>
      <Link to="/" className="btn-primary">Go Home</Link>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={48} className="text-green-400" />
      </div>
      <h1 className="text-3xl font-display font-bold text-white mb-2">Order Confirmed! 🎉</h1>
      <p className="text-dark-200 text-lg mb-2">Thank you for shopping with Bhagat Nutrition</p>
      <p className="text-dark-400 text-sm mb-8">A confirmation will be sent to {order.customer?.email}</p>

      <div className="card p-6 text-left mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><div className="text-dark-400 text-xs uppercase tracking-wide">Order ID</div><div className="text-white font-semibold mt-1">{order.id}</div></div>
          <div><div className="text-dark-400 text-xs uppercase tracking-wide">Tracking ID</div><div className="text-brand-400 font-semibold mt-1">{order.trackingId}</div></div>
          <div><div className="text-dark-400 text-xs uppercase tracking-wide">Payment</div><div className="text-white font-semibold mt-1 capitalize">{order.paymentMethod?.toUpperCase()}</div></div>
          <div><div className="text-dark-400 text-xs uppercase tracking-wide">Status</div><div className="text-green-400 font-semibold mt-1 capitalize">{order.status}</div></div>
        </div>
        <div className="border-t border-dark-700 pt-4">
          <div className="flex justify-between text-sm text-dark-300 mb-1"><span>Subtotal</span><span className="text-white">{formatPrice(order.subtotal)}</span></div>
          {order.discount > 0 && <div className="flex justify-between text-sm text-green-400 mb-1"><span>Discount</span><span>−{formatPrice(order.discount)}</span></div>}
          <div className="flex justify-between text-sm text-dark-300 mb-1"><span>Shipping</span><span className={order.shipping === 0 ? 'text-green-400' : 'text-white'}>{order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</span></div>
          <div className="flex justify-between font-bold text-white text-lg mt-2 pt-2 border-t border-dark-700"><span>Total Paid</span><span>{formatPrice(order.total)}</span></div>
        </div>
        {order.freeGift && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-2">
            <Gift size={18} className="text-green-400" />
            <span className="text-green-400 font-semibold text-sm">Your free gift will be included in the shipment!</span>
          </div>
        )}
      </div>

      <div className="card p-5 flex items-center gap-4 text-left mb-8">
        <div className="w-10 h-10 bg-brand-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Package size={20} className="text-brand-400" />
        </div>
        <div>
          <div className="text-white font-semibold">Estimated Delivery</div>
          <div className="text-dark-300 text-sm">{new Date(order.estimatedDelivery).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Link to={`/track-order?id=${order.id}`} className="btn-secondary"><Package size={18} /> Track Order</Link>
        <Link to="/catalog" className="btn-primary">Continue Shopping <ArrowRight size={18} /></Link>
      </div>
    </div>
  );
}
