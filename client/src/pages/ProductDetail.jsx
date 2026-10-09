import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShoppingCart,
  Star,
  Shield,
  Truck,
  MessageCircle,
  ChevronRight,
  Minus,
  Plus,
  CheckCircle,
  Package,
  RotateCcw,
  Zap,
} from "lucide-react";
import { getProduct } from "../utils/api";
import { useCartStore } from "../store/cartStore";
import ProductCard from "../components/ui/ProductCard";
import Spinner from "../components/ui/Spinner";
import { formatPrice, getDiscount } from "../utils/helpers";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    setLoading(true);
    getProduct(id).then((d) => {
      setData(d);
      setSelectedVariant(d.product.variants?.[0] || null);
      setActiveImg(0);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Spinner size="lg" />;
  if (!data)
    return (
      <div className="text-center py-20 text-dark-300">Product not found</div>
    );

  const { product, related } = data;
  const discount = getDiscount(
    selectedVariant?.price || product.price,
    product.comparePrice,
  );
  const currentPrice = selectedVariant?.price || product.price;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, qty);
    toast.success(`${product.name} added to cart!`, {
      icon: "🛒",
      style: { background: "#1a1a1a", color: "#fff", border: "1px solid #333" },
    });
    openCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-dark-400 mb-8">
        <Link to="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link to="/catalog" className="hover:text-white transition-colors">
          Catalog
        </Link>
        <ChevronRight size={14} />
        <Link
          to={`/catalog?category=${product.category}`}
          className="hover:text-white transition-colors capitalize"
        >
          {product.category.replace(/-/g, " ")}
        </Link>
        <ChevronRight size={14} />
        <span className="text-dark-200 line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 mb-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-dark-800 rounded-2xl overflow-hidden border border-dark-700">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === activeImg ? "border-brand-500" : "border-dark-700 hover:border-dark-500"}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="text-brand-400 font-semibold text-sm uppercase tracking-wide mb-2">
            {product.brand}
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-3 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={16}
                  className={
                    s <= Math.round(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-dark-600"
                  }
                />
              ))}
            </div>
            <span className="text-dark-200 text-sm">
              {product.rating} ({product.reviews.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mb-6">
            <span className="text-4xl font-bold text-white">
              {formatPrice(currentPrice)}
            </span>
            {product.comparePrice && (
              <span className="text-dark-300 line-through text-lg">
                {formatPrice(product.comparePrice)}
              </span>
            )}
            {discount > 0 && (
              <span className="badge bg-green-500/20 text-green-400 text-sm">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Free gift notice */}
          {currentPrice * qty >= 1000 && (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-xl mb-4 text-sm">
              <span className="text-green-400">🎁</span>
              <span className="text-dark-200">
                You qualify for a{" "}
                <span className="text-green-400 font-semibold">FREE gift</span>{" "}
                on prepaid orders!
              </span>
            </div>
          )}

          {/* Variants */}
          {product.variants?.length > 0 && (
            <div className="mb-6">
              <label className="text-dark-200 text-sm font-semibold mb-3 block">
                Select Variant
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${selectedVariant?.id === v.id ? "border-brand-500 bg-brand-500/20 text-white" : "border-dark-600 text-dark-200 hover:border-dark-500"}`}
                  >
                    <div>{v.label}</div>
                    <div className="text-xs mt-0.5 font-bold">
                      {formatPrice(v.price)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="text-dark-200 text-sm font-semibold mb-3 block">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-dark-700 rounded-xl border border-dark-600">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:bg-dark-600 rounded-l-xl transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-5 text-white font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-3 hover:bg-dark-600 rounded-r-xl transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              {selectedVariant && (
                <span className="text-dark-400 text-sm">
                  {selectedVariant.stock} left in stock
                </span>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 btn-primary py-4 text-base disabled:opacity-50"
            >
              <ShoppingCart size={20} />{" "}
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>

            <a
              href={`https://wa.me/919999999999?text=${encodeURIComponent(
                `Hi! I want to order ${product.name}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary py-4 px-5"
              aria-label={`Order ${product.name} on WhatsApp`}
            >
              <MessageCircle size={20} />
            </a>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: Shield,
                label: "Authentic",
                sub: "100% Genuine",
                color: "text-green-400",
              },
              {
                icon: Truck,
                label: "Free Shipping",
                sub: "Orders ₹999+",
                color: "text-blue-400",
              },
              {
                icon: RotateCcw,
                label: "Easy Returns",
                sub: "7-day return",
                color: "text-purple-400",
              },
            ].map(({ icon: Icon, label, sub, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 p-3 bg-dark-700 rounded-xl text-center"
              >
                <Icon size={18} className={color} />
                <div className="text-white text-xs font-semibold">{label}</div>
                <div className="text-dark-400 text-xs">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="flex gap-1 bg-dark-800 rounded-xl p-1 w-fit mb-6 border border-dark-700">
          {["description", "highlights", "nutrition"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? "bg-brand-500 text-white" : "text-dark-300 hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="card p-6">
          {activeTab === "description" && (
            <div>
              <p className="text-dark-100 leading-relaxed text-base">
                {product.description}
              </p>
              {product.certifications?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.certifications.map((c) => (
                    <span
                      key={c}
                      className="badge bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1"
                    >
                      ✓ {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
          {activeTab === "highlights" && (
            <ul className="space-y-3">
              {product.highlights?.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="text-brand-400 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-dark-100">{h}</span>
                </li>
              ))}
            </ul>
          )}
          {activeTab === "nutrition" && (
            <div>
              <div className="text-dark-200 text-sm mb-4">
                Serving Size: {product.servingSize} |{" "}
                {product.servingsPerContainer}
              </div>
              {product.nutrition &&
                Object.entries(product.nutrition)
                  .filter(([, v]) => v > 0)
                  .map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between py-3 border-b border-dark-700 last:border-0"
                    >
                      <span className="text-dark-200 capitalize">{k}</span>
                      <span className="text-white font-semibold">
                        {v}
                        {k === "calories" ? " kcal" : "g"}
                      </span>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related?.length > 0 && (
        <div>
          <h2 className="section-title mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
