import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, ChevronDown, Zap, Target, Dumbbell, Heart, Trophy, Flame } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { clsx } from 'clsx';

const goalIcons = { 'build-muscle': Dumbbell, 'lose-fat': Flame, 'improve-workout': Zap, 'health-wellness': Heart, 'improve-sport': Trophy, 'increase-energy': Zap };

const goals = [
  { id: 'build-muscle', name: 'Build Muscle', icon: Dumbbell, color: 'text-red-400' },
  { id: 'lose-fat', name: 'Lose Fat', icon: Flame, color: 'text-orange-400' },
  { id: 'improve-workout', name: 'Improve Workout', icon: Zap, color: 'text-purple-400' },
  { id: 'health-wellness', name: 'Health & Wellness', icon: Heart, color: 'text-green-400' },
  { id: 'improve-sport', name: 'Improve Sport', icon: Trophy, color: 'text-blue-400' },
  { id: 'increase-energy', name: 'Increase Energy', icon: Zap, color: 'text-yellow-400' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [goalOpen, setGoalOpen] = useState(false);
  const { itemCount, toggleCart } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setGoalOpen(false); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) { navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`); setSearchOpen(false); setSearchQuery(''); }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-600 text-white text-sm py-2 text-center font-medium">
        <span className="animate-pulse mr-2">🎁</span>
        FREE Gift with every Prepaid Order | Flat ₹75 OFF above ₹5,000 &nbsp;
        <Link to="/catalog" className="underline font-bold hover:text-brand-200 transition-colors">Shop Now →</Link>
      </div>

      {/* Main Navbar */}
      <nav className={clsx(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-2xl border-b border-dark-700' : 'bg-dark-900 border-b border-dark-800'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">B</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-bold text-white text-lg leading-tight">Bhagat</div>
                <div className="text-brand-400 text-xs font-medium -mt-0.5">NUTRITION</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/catalog">Catalog</NavLink>

              {/* Shop by Goal dropdown */}
              <div className="relative" onMouseEnter={() => setGoalOpen(true)} onMouseLeave={() => setGoalOpen(false)}>
                <button className="flex items-center gap-1 px-4 py-2 text-dark-100 hover:text-white font-medium text-sm rounded-lg hover:bg-dark-700 transition-all">
                  Shop by Goal <ChevronDown size={14} className={clsx('transition-transform', goalOpen && 'rotate-180')} />
                </button>
                {goalOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-dark-800 border border-dark-600 rounded-2xl shadow-2xl p-2 grid grid-cols-1 gap-1">
                    {goals.map(g => (
                      <Link key={g.id} to={`/catalog?goal=${g.id}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-dark-700 transition-colors group">
                        <g.icon size={16} className={g.color} />
                        <span className="text-sm text-dark-100 group-hover:text-white font-medium">{g.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="/track-order">Track Order</NavLink>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input ref={searchRef} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search products..." autoFocus
                    className="w-48 md:w-64 px-4 py-2 bg-dark-700 border border-dark-500 rounded-xl text-sm text-white placeholder-dark-300 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  <button type="button" onClick={() => setSearchOpen(false)} className="ml-2 p-2 text-dark-300 hover:text-white">
                    <X size={18} />
                  </button>
                </form>
              ) : (
                <button onClick={() => setSearchOpen(true)} className="p-2 text-dark-100 hover:text-white hover:bg-dark-700 rounded-xl transition-all">
                  <Search size={20} />
                </button>
              )}

              {/* Cart */}
              <button onClick={toggleCart} className="relative p-2 text-dark-100 hover:text-white hover:bg-dark-700 rounded-xl transition-all">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-dark-100 hover:text-white hover:bg-dark-700 rounded-xl transition-all">
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-dark-800 border-t border-dark-700 px-4 py-4 space-y-1">
            <MobileLink to="/">Home</MobileLink>
            <MobileLink to="/catalog">Catalog</MobileLink>
            <div className="pt-2 pb-1 px-2 text-xs font-semibold text-dark-300 uppercase tracking-wider">Shop by Goal</div>
            {goals.map(g => (
              <Link key={g.id} to={`/catalog?goal=${g.id}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-dark-700 transition-colors">
                <g.icon size={16} className={g.color} />
                <span className="text-sm text-dark-100 font-medium">{g.name}</span>
              </Link>
            ))}
            <div className="pt-1">
              <MobileLink to="/about">About Us</MobileLink>
              <MobileLink to="/contact">Contact</MobileLink>
              <MobileLink to="/track-order">Track Order</MobileLink>
              <MobileLink to="/authorization">Authorization</MobileLink>
              <MobileLink to="/faq">FAQs</MobileLink>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

function NavLink({ to, children }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link to={to} className={clsx('px-4 py-2 font-medium text-sm rounded-lg transition-all', active ? 'text-brand-400 bg-brand-500/10' : 'text-dark-100 hover:text-white hover:bg-dark-700')}>
      {children}
    </Link>
  );
}

function MobileLink({ to, children }) {
  return (
    <Link to={to} className="block px-3 py-2.5 text-dark-100 hover:text-white hover:bg-dark-700 rounded-xl transition-colors font-medium">
      {children}
    </Link>
  );
}
