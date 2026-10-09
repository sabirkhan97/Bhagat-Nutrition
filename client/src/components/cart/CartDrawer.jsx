import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, Gift, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/helpers';
import { clsx } from 'clsx';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty } = useCartStore();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 999 ? 0 : 80;
  const total = subtotal + shipping;
  const hasFreeGift = subtotal >= 1000;
  const toFreeShipping = Math.max(0, 999 - subtotal);

  return (
    <>
      {/* Overlay */}
      <div onClick={closeCart} className={clsx('fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity', isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')} />

      {/* Drawer */}
      <div className={clsx('fixed right-0 top-0 h-full w-full max-w-md bg-dark-800 border-l border-dark-700 z-50 flex flex-col shadow-2xl transition-transform duration-300', isOpen ? 'translate-x-0' : 'translate-x-full')}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-dark-700">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-brand-400" />
            <h2 className="font-display font-bold text-lg text-white">Your Cart</h2>
            {items.length > 0 && <span className="badge bg-brand-500/20 text-brand-400">{items.reduce((s, i) => s + i.qty, 0)} items</span>}
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-dark-700 rounded-xl transition-colors"><X size={20} /></button>
        </div>

        {/* Free shipping bar */}
        {toFreeShipping > 0 && (
          <div className="px-5 py-3 bg-dark-700 border-b border-dark-600">
            <div className="flex justify-between text-xs text-dark-200 mb-1.5">
              <span>Add {formatPrice(toFreeShipping)} more for FREE shipping</span>
              <span className="text-green-400 font-semibold">FREE</span>
            </div>
            <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${Math.min(100, (subtotal / 999) * 100)}%` }} />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 bg-dark-700 rounded-2xl flex items-center justify-center">
                <ShoppingBag size={36} className="text-dark-400" />
              </div>
              <div>
                <div className="text-white font-semibold text-lg">Your cart is empty</div>
                <div className="text-dark-300 text-sm mt-1">Add some products to get started</div>
              </div>
              <button onClick={closeCart}><Link to="/catalog" className="btn-primary text-sm">Browse Products</Link></button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.key} className="flex gap-3 bg-dark-700 rounded-xl p-3">
                <img src={item.product.thumbnail} alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-dark-600" />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm leading-tight line-clamp-2">{item.product.name}</div>
                  {item.variant && <div className="text-dark-300 text-xs mt-0.5">{item.variant.label}</div>}
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-brand-400 font-bold text-sm">{formatPrice(item.price)}</div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQty(item.key, item.qty - 1)}
                        className="w-7 h-7 bg-dark-600 hover:bg-dark-500 rounded-lg flex items-center justify-center transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="w-7 text-center text-white text-sm font-medium">{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)}
                        className="w-7 h-7 bg-dark-600 hover:bg-dark-500 rounded-lg flex items-center justify-center transition-colors">
                        <Plus size={12} />
                      </button>
                      <button onClick={() => removeItem(item.key)}
                        className="w-7 h-7 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center transition-colors ml-1">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Free gift notice */}
          {hasFreeGift && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 flex items-center gap-3">
              <Gift size={20} className="text-green-400 flex-shrink-0" />
              <div className="text-sm"><span className="text-green-400 font-semibold">Free Gift Unlocked!</span> <span className="text-dark-200">Choose prepaid to claim your gift.</span></div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-dark-700 px-5 py-4 space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-dark-200">
                <span>Subtotal</span><span className="text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-dark-200">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-400 font-semibold' : 'text-white'}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-bold text-white border-t border-dark-700 pt-2">
                <span>Total</span><span className="text-xl">{formatPrice(total)}</span>
              </div>
            </div>
            <Link to="/checkout" onClick={closeCart}
              className="btn-primary w-full text-base">
              Proceed to Checkout <ArrowRight size={18} />
            </Link>
            <button onClick={closeCart}>
              <Link to="/catalog" className="block text-center text-dark-300 hover:text-white text-sm transition-colors">Continue Shopping</Link>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
