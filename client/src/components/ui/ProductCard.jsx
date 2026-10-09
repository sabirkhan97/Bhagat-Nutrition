import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Zap } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice, getDiscount } from '../../utils/helpers';
import toast from 'react-hot-toast';
import { clsx } from 'clsx';

export default function ProductCard({ product }) {
  const [wish, setWish] = useState(false);
  const [adding, setAdding] = useState(false);
  const { addItem, openCart } = useCartStore();
  const discount = getDiscount(product.price, product.comparePrice);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addItem(product, product.variants?.[0] || null, 1);
    toast.success('Added to cart!', { icon: '🛒', duration: 2000, style: { background: '#1a1a1a', color: '#fff', border: '1px solid #333' } });
    setTimeout(() => { setAdding(false); openCart(); }, 300);
  };

  return (
    <Link to={`/product/${product.id}`}
      className="group card hover:border-dark-500 hover:shadow-xl hover:shadow-black/50 transition-all duration-300 block">
      {/* Image */}
      <div className="relative aspect-square bg-dark-700 overflow-hidden">
        <img src={product.thumbnail} alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount > 0 && <span className="badge bg-green-500 text-white text-xs">{discount}% OFF</span>}
          {product.isNew && <span className="badge bg-blue-500 text-white text-xs">NEW</span>}
          {product.isBestSeller && <span className="badge bg-brand-500 text-white text-xs">🔥 HOT</span>}
        </div>

        {/* Wishlist */}
        <button onClick={(e) => { e.preventDefault(); setWish(!wish); }}
          className={clsx('absolute top-3 right-3 p-2 rounded-xl transition-all opacity-0 group-hover:opacity-100', wish ? 'bg-red-500 text-white' : 'bg-dark-800/80 text-dark-200 hover:text-red-400')}>
          <Heart size={14} fill={wish ? 'currentColor' : 'none'} />
        </button>

        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button onClick={handleAddToCart} disabled={!product.inStock || adding}
            className={clsx('w-full py-3 font-semibold text-sm flex items-center justify-center gap-2 transition-colors', product.inStock ? 'bg-brand-500 hover:bg-brand-600 text-white' : 'bg-dark-700 text-dark-400 cursor-not-allowed')}>
            {!product.inStock ? 'Out of Stock' : adding ? (<><Zap size={16} className="animate-pulse" /> Adding...</>) : (<><ShoppingCart size={16} /> Quick Add</>)}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="text-xs text-brand-400 font-semibold mb-1 uppercase tracking-wide">{product.brand}</div>
        <h3 className="text-white font-medium text-sm leading-snug line-clamp-2 mb-2 group-hover:text-brand-300 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={11} className={s <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-dark-500'} />
            ))}
          </div>
          <span className="text-dark-300 text-xs">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2">
          <span className="text-white font-bold text-lg">{formatPrice(product.price)}</span>
          {product.comparePrice && <span className="text-dark-300 text-xs line-through">{formatPrice(product.comparePrice)}</span>}
        </div>

        {/* Authenticity mark */}
        {product.authentic && (
          <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
            <span>✓</span><span>100% Authentic</span>
          </div>
        )}
      </div>
    </Link>
  );
}
