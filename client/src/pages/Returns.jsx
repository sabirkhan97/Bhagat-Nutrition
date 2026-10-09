import React from 'react';
import { RotateCcw, CheckCircle, XCircle, MessageCircle, Clock } from 'lucide-react';

export default function Returns() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <RotateCcw size={32} className="text-blue-400" />
        </div>
        <h1 className="section-title mb-2">Returns & <span className="text-gradient">Refunds</span></h1>
        <p className="section-subtitle">Hassle-free return policy for your peace of mind</p>
      </div>

      <div className="space-y-6">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="text-brand-400" size={20} /> Return Window
          </h2>
          <div className="p-4 bg-brand-500/10 border border-brand-500/20 rounded-xl text-center">
            <div className="text-4xl font-display font-bold text-brand-400">7 Days</div>
            <div className="text-dark-200 mt-1">from the date of delivery</div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-400" size={20} /> Eligible for Return
          </h2>
          <ul className="space-y-2">
            {[
              'Sealed, unopened products in original packaging',
              'Products damaged in transit (with photographic evidence)',
              'Wrong product delivered',
              'Products with tampered or broken seal (not opened by customer)',
              'Products significantly different from description',
            ].map(i => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-dark-200 text-sm">{i}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <XCircle className="text-red-400" size={20} /> Not Eligible for Return
          </h2>
          <ul className="space-y-2">
            {[
              'Opened or partially used products',
              'Products without original packaging',
              'Returns requested after 7 days of delivery',
              'Products damaged due to customer mishandling',
              'Perishable items past expiry (check before purchase)',
            ].map(i => (
              <li key={i} className="flex items-start gap-3">
                <XCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-dark-200 text-sm">{i}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold text-white mb-4">How to Initiate a Return</h2>
          <div className="space-y-3">
            {[
              { step: '1', title: 'Contact Us', desc: 'WhatsApp or email us within 7 days of delivery with your order ID and reason for return.' },
              { step: '2', title: 'Send Photos', desc: 'Share photos of the product and its current condition for quicker processing.' },
              { step: '3', title: 'Get Approval', desc: 'Our team will review and approve your return request within 24 hours.' },
              { step: '4', title: 'Ship It Back', desc: 'We\'ll arrange pickup (in some cases) or guide you on shipping the product back.' },
              { step: '5', title: 'Refund', desc: 'Refund is processed within 5–7 business days after we receive the returned product.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4">
                <div className="w-8 h-8 bg-brand-500/20 text-brand-400 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{step}</div>
                <div><div className="text-white font-semibold text-sm">{title}</div><div className="text-dark-300 text-sm">{desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-start gap-4">
          <MessageCircle size={22} className="text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-white font-semibold mb-1">Quick Returns via WhatsApp</div>
            <div className="text-dark-200 text-sm mb-3">For the fastest resolution, contact us on WhatsApp with your order ID and a photo of the issue.</div>
            <a href="https://wa.me/919999999999?text=Hi! I need to initiate a return for order" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl text-sm transition-colors">
              <MessageCircle size={16} /> Start Return on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
