import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, Search, Grid, List } from 'lucide-react';
import { getProducts, getCategories, getBrands } from '../utils/api';
import ProductCard from '../components/ui/ProductCard';
import Spinner from '../components/ui/Spinner';
import { debounce } from '../utils/helpers';
import { clsx } from 'clsx';

const sortOptions = [
  { value: '', label: 'Featured' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
];

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: params.get('search') || '',
    category: params.get('category') || '',
    brand: params.get('brand') || '',
    goal: params.get('goal') || '',
    sort: '',
    inStock: false,
    minPrice: '',
    maxPrice: '',
    bestSeller: params.get('bestSeller') === 'true',
    isNew: params.get('isNew') === 'true',
  });

  useEffect(() => {
    getCategories().then(setCategories);
    getBrands().then(setBrands);
  }, []);

  const fetchProducts = useCallback(
    debounce(async (f, p) => {
      setLoading(true);
      const query = { ...f, page: p, limit: 12 };
      Object.keys(query).forEach(k => !query[k] && delete query[k]);
      const data = await getProducts(query);
      setProducts(data.products);
      setTotal(data.total);
      setLoading(false);
    }, 300),
    []
  );

  useEffect(() => { fetchProducts(filters, page); }, [filters, page]);

  const setFilter = (key, val) => { setFilters(f => ({ ...f, [key]: val })); setPage(1); };

  const activeFilters = Object.entries(filters).filter(([k, v]) => v && k !== 'sort').length;

  const clearAll = () => {
    setFilters({ search: '', category: '', brand: '', goal: '', sort: '', inStock: false, minPrice: '', maxPrice: '', bestSeller: false, isNew: false });
    setParams({});
    setPage(1);
  };

  const pageTitle = filters.category
    ? categories.find(c => c.id === filters.category)?.name
    : filters.goal ? filters.goal.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : filters.search ? `Search: "${filters.search}"` : 'All Products';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="section-title mb-1">{pageTitle}</h1>
        <p className="text-dark-300">{total} products found</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="card p-5 sticky top-24 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Filters</h3>
              {activeFilters > 0 && <button onClick={clearAll} className="text-brand-400 text-xs hover:text-brand-300">Clear all ({activeFilters})</button>}
            </div>

            {/* Search */}
            <div>
              <label className="text-dark-200 text-xs uppercase tracking-wide font-semibold mb-2 block">Search</label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                <input value={filters.search} onChange={e => setFilter('search', e.target.value)}
                  placeholder="Search products..." className="input-field pl-8 text-sm" />
              </div>
            </div>

            {/* Category */}
            <FilterSection title="Category">
              <div className="space-y-1">
                <button onClick={() => setFilter('category', '')}
                  className={clsx('w-full text-left px-3 py-2 rounded-lg text-sm transition-colors', !filters.category ? 'bg-brand-500/20 text-brand-400 font-medium' : 'text-dark-200 hover:bg-dark-700')}>
                  All Categories
                </button>
                {categories.map(c => (
                  <button key={c.id} onClick={() => setFilter('category', c.id)}
                    className={clsx('w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between', filters.category === c.id ? 'bg-brand-500/20 text-brand-400 font-medium' : 'text-dark-200 hover:bg-dark-700')}>
                    <span>{c.icon} {c.name}</span>
                    <span className="text-dark-500 text-xs">{c.count}</span>
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* Price */}
            <FilterSection title="Price Range">
              <div className="flex gap-2">
                <input value={filters.minPrice} onChange={e => setFilter('minPrice', e.target.value)} placeholder="Min ₹" className="input-field text-sm" />
                <input value={filters.maxPrice} onChange={e => setFilter('maxPrice', e.target.value)} placeholder="Max ₹" className="input-field text-sm" />
              </div>
            </FilterSection>

            {/* Availability */}
            <FilterSection title="Availability">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={filters.inStock} onChange={e => setFilter('inStock', e.target.checked)}
                  className="rounded bg-dark-700 border-dark-500 text-brand-500 focus:ring-brand-500" />
                <span className="text-dark-200 text-sm">In Stock Only</span>
              </label>
            </FilterSection>

            {/* Quick Filters */}
            <FilterSection title="Quick Filters">
              <div className="space-y-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={filters.bestSeller} onChange={e => setFilter('bestSeller', e.target.checked)} className="rounded bg-dark-700 border-dark-500 text-brand-500" />
                  <span className="text-dark-200 text-sm">🔥 Best Sellers</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={filters.isNew} onChange={e => setFilter('isNew', e.target.checked)} className="rounded bg-dark-700 border-dark-500 text-brand-500" />
                  <span className="text-dark-200 text-sm">✨ New Arrivals</span>
                </label>
              </div>
            </FilterSection>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button onClick={() => setFiltersOpen(!filtersOpen)} className="lg:hidden btn-secondary text-sm gap-2">
              <SlidersHorizontal size={16} /> Filters {activeFilters > 0 && <span className="badge bg-brand-500 text-white">{activeFilters}</span>}
            </button>

            {/* Active filter chips */}
            {filters.category && <Chip label={categories.find(c => c.id === filters.category)?.name || filters.category} onRemove={() => setFilter('category', '')} />}
            {filters.brand && <Chip label={filters.brand.replace(/-/g, ' ')} onRemove={() => setFilter('brand', '')} />}
            {filters.goal && <Chip label={filters.goal.replace(/-/g, ' ')} onRemove={() => setFilter('goal', '')} />}
            {filters.search && <Chip label={`"${filters.search}"`} onRemove={() => setFilter('search', '')} />}
            {activeFilters > 1 && <button onClick={clearAll} className="text-dark-400 hover:text-white text-sm flex items-center gap-1">Clear all</button>}

            <div className="ml-auto flex items-center gap-3">
              <select value={filters.sort} onChange={e => setFilter('sort', e.target.value)}
                className="input-field text-sm w-auto py-2 cursor-pointer">
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {filtersOpen && (
            <div className="lg:hidden card p-5 mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Filters</h3>
                <button onClick={() => setFiltersOpen(false)}><X size={18} /></button>
              </div>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                <input value={filters.search} onChange={e => setFilter('search', e.target.value)} placeholder="Search..." className="input-field pl-8 text-sm" />
              </div>
              <div>
                <label className="text-dark-200 text-xs uppercase tracking-wide font-semibold mb-2 block">Category</label>
                <select value={filters.category} onChange={e => setFilter('category', e.target.value)} className="input-field text-sm">
                  <option value="">All</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={filters.inStock} onChange={e => setFilter('inStock', e.target.checked)} />
                <span className="text-dark-200 text-sm">In Stock Only</span>
              </label>
            </div>
          )}

          {/* Products Grid */}
          {loading ? <Spinner /> : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <div className="text-white text-xl font-semibold mb-2">No products found</div>
              <div className="text-dark-300 mb-6">Try adjusting your filters or search query</div>
              <button onClick={clearAll} className="btn-primary">Clear Filters</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>

              {/* Pagination */}
              {total > 12 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-secondary text-sm disabled:opacity-40">← Prev</button>
                  <span className="text-dark-200 text-sm px-4">Page {page} of {Math.ceil(total / 12)}</span>
                  <button onClick={() => setPage(p => p + 1)} disabled={page >= Math.ceil(total / 12)} className="btn-secondary text-sm disabled:opacity-40">Next →</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full text-dark-200 text-xs uppercase tracking-wide font-semibold mb-2">
        {title} <ChevronDown size={14} className={clsx('transition-transform', !open && '-rotate-90')} />
      </button>
      {open && children}
    </div>
  );
}

function Chip({ label, onRemove }) {
  return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-500/20 text-brand-400 rounded-full text-xs font-medium">
      {label} <button onClick={onRemove} className="hover:text-white"><X size={12} /></button>
    </span>
  );
}
