import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, MessageCircle, Shield, Award, Truck, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-dark-700 mt-20">
      {/* Trust bar */}
      <div className="border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Shield, label: '100% Authentic', sub: 'Verified products only', color: 'text-green-400' },
            { icon: Truck, label: 'Fast Delivery', sub: 'Pan India shipping', color: 'text-blue-400' },
            { icon: Award, label: 'Expert Advice', sub: 'Free consultation', color: 'text-brand-400' },
            { icon: Clock, label: 'Easy Returns', sub: '7-day return policy', color: 'text-purple-400' },
          ].map(({ icon: Icon, label, sub, color }) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-dark-700 ${color}`}><Icon size={20} /></div>
              <div><div className="font-semibold text-white text-sm">{label}</div><div className="text-dark-200 text-xs">{sub}</div></div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">B</span>
            </div>
            <div>
              <div className="font-display font-bold text-white text-lg leading-tight">Bhagat</div>
              <div className="text-brand-400 text-xs font-medium -mt-0.5">NUTRITION</div>
            </div>
          </div>
          <p className="text-dark-200 text-sm leading-relaxed mb-4">
            India's most trusted supplement store. We bring you 100% authentic fitness nutrition with expert guidance and transparent pricing.
          </p>
          <div className="flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"
              className="p-2 bg-dark-700 rounded-xl text-dark-200 hover:text-pink-400 hover:bg-dark-600 transition-all">
              <Instagram size={18} />
            </a>
            <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"
              className="p-2 bg-dark-700 rounded-xl text-dark-200 hover:text-green-400 hover:bg-dark-600 transition-all">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[['/', 'Home'], ['/catalog', 'All Products'], ['/about', 'About Us'], ['/authorization', 'Authorization'], ['/programs', 'Programs'], ['/track-order', 'Track Order']].map(([to, label]) => (
              <li key={to}><Link to={to} className="text-dark-200 hover:text-brand-400 text-sm transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold text-white mb-4">Support</h4>
          <ul className="space-y-2">
            {[['/faq', 'FAQs'], ['/returns', 'Returns & Refunds'], ['/contact', 'Contact Us'], ['/track-order', 'Track Order']].map(([to, label]) => (
              <li key={to}><Link to={to} className="text-dark-200 hover:text-brand-400 text-sm transition-colors">{label}</Link></li>
            ))}
          </ul>
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
            <div className="text-green-400 font-semibold text-sm mb-1">💬 WhatsApp Expert</div>
            <a href="https://wa.me/919999999999?text=Hi!%20I%20need%20supplement%20advice" target="_blank" rel="noreferrer"
              className="text-dark-200 text-xs hover:text-green-400 transition-colors">Chat with our supplement expert →</a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex gap-3 text-dark-200 text-sm">
              <MapPin size={16} className="text-brand-400 flex-shrink-0 mt-0.5" />
              <span>341, 16 Nai Basti, near Mohit Thread Company, Sector 8, Gurugram, Haryana 122001</span>
            </li>
            <li className="flex gap-3 text-dark-200 text-sm">
              <Phone size={16} className="text-brand-400 flex-shrink-0 mt-0.5" />
              <a href="tel:+919999999999" className="hover:text-brand-400 transition-colors">+91 99999 99999</a>
            </li>
            <li className="flex gap-3 text-dark-200 text-sm">
              <Mail size={16} className="text-brand-400 flex-shrink-0 mt-0.5" />
              <a href="mailto:hello@bhagatnutrition.in" className="hover:text-brand-400 transition-colors">hello@bhagatnutrition.in</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-dark-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-dark-300 text-xs">
          <div>© 2026 Bhagat Nutrition. All rights reserved.</div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-dark-100 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-dark-100 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
