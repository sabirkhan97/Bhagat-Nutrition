import React from 'react';
import { Shield, CheckCircle, AlertTriangle, Award } from 'lucide-react';

export default function Authorization() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield size={40} className="text-green-400" />
        </div>
        <h1 className="section-title mb-2">Our <span className="text-gradient">Authorization</span></h1>
        <p className="section-subtitle">How we guarantee every product is 100% genuine</p>
      </div>

      <div className="space-y-6">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Award className="text-brand-400" size={22} /> Why Authenticity Matters</h2>
          <p className="text-dark-200 leading-relaxed">The supplement industry is unfortunately filled with counterfeit products, diluted formulas, and misleading labels. As a customer, you deserve to know that what you're putting in your body is exactly what it says on the label.</p>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><CheckCircle className="text-green-400" size={22} /> How We Verify Products</h2>
          <div className="space-y-3">
            {['Direct partnerships with brand official distributors and importers', 'All products come with batch numbers traceable to the manufacturer', 'We conduct regular quality checks on our entire inventory', 'Our FSSAI license requires us to maintain product traceability records', 'Customers can verify product authenticity using the brand\'s official app or QR codes'].map(p => (
              <div key={p} className="flex items-start gap-3"><CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" /><span className="text-dark-200 text-sm">{p}</span></div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><AlertTriangle className="text-yellow-400" size={22} /> Red Flags to Watch For</h2>
          <div className="space-y-2">
            {['Price significantly below MRP (often a sign of fake products)', 'No batch number or manufacturing date on packaging', 'Blurry or misaligned label printing', 'Tampered seal or damaged packaging', 'No FSSAI number on Indian market products'].map(f => (
              <div key={f} className="flex items-start gap-3"><AlertTriangle size={14} className="text-yellow-400 flex-shrink-0 mt-0.5" /><span className="text-dark-200 text-sm">{f}</span></div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-400 text-sm">
            If you suspect any product from us is not genuine, contact us immediately. We will replace it no questions asked.
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[{ icon: '🏆', title: 'FSSAI Licensed', desc: 'All products comply with Indian food safety regulations', num: 'License #123456' }, { icon: '✅', title: 'Authorized Retailer', desc: 'We are official authorized retailers for all major brands we carry', num: '10+ brand authorizations' }, { icon: '📋', title: 'Batch Traceable', desc: 'Every product has a traceable batch number linked to manufacturer records', num: '100% traceability' }].map(({ icon, title, desc, num }) => (
            <div key={title} className="card p-5 text-center">
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="text-white font-semibold mb-1">{title}</h3>
              <p className="text-dark-300 text-sm mb-2">{desc}</p>
              <div className="text-brand-400 text-xs font-semibold">{num}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
