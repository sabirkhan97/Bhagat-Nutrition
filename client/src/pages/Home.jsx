import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  ChevronRight,
  Dumbbell,
  Flame,
  Zap,
  HeartPulse,
  Trophy,
  Sparkles,
} from 'lucide-react';
import { getProducts, getCategories, getBrands } from '../utils/api';
import ProductCard from '../components/ui/ProductCard';
import Spinner from '../components/ui/Spinner';

const goals = [
  { id: 'build-muscle', name: 'Build Muscle', detail: 'Protein & creatine', Icon: Dumbbell },
  { id: 'lose-fat', name: 'Weight Management', detail: 'Support your routine', Icon: Flame },
  { id: 'improve-workout', name: 'Workout Energy', detail: 'Pre-workout support', Icon: Zap },
  { id: 'health-wellness', name: 'Daily Wellness', detail: 'Vitamins & essentials', Icon: HeartPulse },
  { id: 'improve-sport', name: 'Sports Nutrition', detail: 'Train with purpose', Icon: Trophy },
  { id: 'increase-energy', name: 'Performance', detail: 'Everyday training fuel', Icon: Sparkles },
];

const benefits = [
  { Icon: ShieldCheck, title: 'Shop with confidence', detail: 'Quality-focused supplement shopping' },
  { Icon: Truck, title: 'Delivery to your door', detail: 'Convenient online ordering' },
  { Icon: Headphones, title: 'Need help choosing?', detail: 'Contact our team for product guidance' },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;

    Promise.all([
      getProducts({ bestSeller: true, limit: 8 }),
      getProducts({ isNew: true, limit: 8 }),
      getCategories(),
      getBrands(),
    ])
      .then(([bestSellers, arrivals, categoryList, brandList]) => {
        if (!active) return;
        setProducts(bestSellers?.products ?? []);
        setNewArrivals(arrivals?.products ?? []);
        setCategories(Array.isArray(categoryList) ? categoryList : []);
        setBrands(Array.isArray(brandList) ? brandList : []);
      })
      .catch((error) => {
        console.error('Unable to load home page content:', error);
        if (active) setLoadError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      {/* Compact promotional hero */}
      <section className="px-3 pt-3 sm:px-5 lg:px-8 lg:pt-5">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#111114] text-white shadow-sm sm:rounded-3xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(220,38,38,0.32),transparent_45%)]" />
          <div className="relative grid min-h-[280px] grid-cols-1 items-center gap-3 px-5 py-7 sm:min-h-[310px] sm:px-9 md:grid-cols-[1.1fr_0.9fr] md:px-12 lg:min-h-[340px] lg:px-16">
            <div className="z-10 max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-red-200 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500/100" /> Nutrition for your next level
              </div>
              <h1 className="max-w-lg text-3xl font-black leading-[1.06] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]">
                Make every
                <span className="block text-red-500">rep count.</span>
              </h1>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/70 sm:mt-4 sm:text-base">
                Discover protein, creatine and everyday nutrition essentials for your fitness journey.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
                <Link
                  to="/catalog"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#101114]"
                >
                  Shop supplements <ArrowRight size={17} />
                </Link>
                <Link to="/catalog?bestSeller=true" className="inline-flex items-center gap-1.5 px-2 py-3 text-sm font-semibold text-white/85 transition hover:text-white">
                  Explore best sellers <ChevronRight size={16} />
                </Link>
              </div>
              <p className="mt-4 text-[11px] text-white/45">Choose products that fit your goals, routine and budget.</p>
            </div>

            <div className="relative hidden h-full min-h-[235px] md:block">
              <div className="absolute right-5 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full border border-red-500/20 bg-red-500/100/10 lg:right-12 lg:h-64 lg:w-64" />
              <div className="absolute right-12 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-white/10 lg:right-20 lg:h-48 lg:w-48" />
              <img
                src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=900&q=85"
                alt="Athlete training in a gym"
                className="absolute right-0 top-1/2 h-[235px] w-[58%] -translate-y-1/2 rounded-2xl object-cover object-center opacity-90 [mask-image:linear-gradient(to_right,transparent,black_22%)] lg:right-5 lg:h-[280px]"
                loading="eager"
              />
              <div className="absolute bottom-4 left-3 rounded-xl border border-white/10 bg-black/65 px-4 py-3 backdrop-blur-sm lg:bottom-5 lg:left-0">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-300">Your goals. Your routine.</div>
                <div className="mt-1 text-sm font-bold text-white">Build better habits</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact trust strip */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 py-5 sm:grid-cols-3 sm:px-5 lg:px-8">
        {benefits.map(({ Icon, title, detail }) => (
          <div key={title} className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111114] px-4 py-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-600"><Icon size={20} /></span>
            <span className="min-w-0"><span className="block text-sm font-bold text-white">{title}</span><span className="mt-0.5 block text-xs leading-5 text-slate-400">{detail}</span></span>
          </div>
        ))}
      </section>

      {/* Shop by goal */}
      <section className="mx-auto max-w-7xl px-4 pb-9 pt-4 sm:px-5 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">Find your fit</p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Shop by goal</h2>
          </div>
          <Link to="/catalog" className="hidden items-center gap-1 text-sm font-bold text-slate-200 hover:text-red-600 sm:inline-flex">View all <ArrowRight size={16} /></Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {goals.map(({ id, name, detail, Icon }) => (
            <Link key={id} to={`/catalog?goal=${id}`} className="group rounded-xl border border-white/10 bg-[#111114] p-4 transition hover:-translate-y-0.5 hover:border-red-500/50 hover:shadow-[0_12px_35px_rgba(220,38,38,0.10)]">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-slate-100 transition group-hover:bg-red-600 group-hover:text-white"><Icon size={20} /></span>
              <span className="block text-sm font-bold leading-5 text-white">{name}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">{detail}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 lg:px-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">Browse collection</p><h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">Shop by category</h2></div>
            <Link to="/catalog" className="inline-flex items-center gap-1 text-sm font-bold text-slate-200 hover:text-red-600">View all <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.slice(0, 12).map((category) => (
              <Link key={category.id} to={`/catalog?category=${category.id}`} className="flex min-h-[108px] flex-col justify-between rounded-xl border border-white/10 bg-[#0d0d10] p-4 transition hover:border-red-500/50 hover:bg-[#111114] hover:shadow-sm">
                <span className="text-2xl" aria-hidden="true">{category.icon || '＋'}</span>
                <span className="mt-3 text-sm font-bold leading-5 text-slate-100">{category.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Best sellers */}
      <section className="bg-[#0d0d10] py-9 sm:py-11">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">Customer favourites</p><h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">Best sellers</h2><p className="mt-1 text-sm text-slate-400">Popular picks for your supplement routine.</p></div>
            <Link to="/catalog?bestSeller=true" className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-slate-200 hover:text-red-600">View all <ArrowRight size={16} /></Link>
          </div>
          {loading ? <Spinner /> : products.length ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          ) : <p className="rounded-xl border border-white/10 bg-[#111114] p-6 text-sm text-slate-400">{loadError ? 'Products could not be loaded. Please try again later.' : 'Best sellers will appear here soon.'}</p>}
        </div>
      </section>

      {/* Brands */}
      {brands.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-9 sm:px-5 sm:py-11 lg:px-8">
          <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">Brands you know</p><h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">Shop trusted brands</h2></div><Link to="/catalog" className="inline-flex items-center gap-1 text-sm font-bold text-slate-200 hover:text-red-600">All brands <ArrowRight size={16} /></Link></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {brands.slice(0, 12).map((brand) => (
              <Link key={brand.id} to={`/catalog?brand=${brand.id}`} className="flex min-h-[94px] items-center gap-3 rounded-xl border border-white/10 bg-[#111114] p-3 transition hover:border-red-500/50 hover:shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sm font-black text-slate-100" style={brand.color ? { color: brand.color, backgroundColor: `${brand.color}14` } : undefined}>{brand.logo || brand.name?.slice(0, 2)}</span>
                <span className="line-clamp-2 text-sm font-bold text-slate-100">{brand.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Simple closing CTA */}
      <section className="px-4 pb-10 sm:px-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 rounded-2xl bg-[#111114] px-6 py-7 text-white sm:flex-row sm:items-center sm:px-9 sm:py-8">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-red-400">Start with your goal</p><h2 className="mt-2 text-xl font-extrabold sm:text-2xl">Find the right supplements for your routine.</h2><p className="mt-1 text-sm text-white/60">Browse the collection and compare your options.</p></div>
          <Link to="/catalog" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700">Explore products <ArrowRight size={17} /></Link>
        </div>
      </section>
    </main>
  );
}