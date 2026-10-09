import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Users, Heart, ArrowRight, CheckCircle } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 bg-brand-500/20 text-brand-400 rounded-full text-sm font-semibold mb-4">Our Story</div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
          Premium Fitness Nutrition,<br /><span className="text-gradient">Trusted by Thousands</span>
        </h1>
        <p className="text-dark-200 text-xl max-w-2xl mx-auto leading-relaxed">
          Bhagat Nutrition was founded with a simple mission: make authentic, high-quality supplements accessible to every Indian fitness enthusiast without compromise.
        </p>
      </div>

      {/* Story */}
      <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Why We Started</h2>
          <p className="text-dark-200 leading-relaxed mb-4">
            The Indian supplement market has a serious authenticity problem. Counterfeit products, diluted formulas, and fake packaging were everywhere. Customers couldn't trust what they were buying.
          </p>
          <p className="text-dark-200 leading-relaxed mb-4">
            We started Bhagat Nutrition to change that. Based in Gurugram, we built direct relationships with brands and authorized distributors, creating a store where every product comes with a guarantee of authenticity.
          </p>
          <p className="text-dark-200 leading-relaxed">
            Today, we serve thousands of customers across India, from beginners starting their fitness journey to professional athletes preparing for competition.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[['10,000+', 'Happy Customers'], ['100+', 'Authentic Brands'], ['92+', 'Products', ], ['4.8★', 'Avg. Rating']].map(([num, label]) => (
            <div key={label} className="card p-6 text-center">
              <div className="text-3xl font-display font-bold text-brand-400 mb-1">{num}</div>
              <div className="text-dark-300 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Core Values</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: Shield, title: 'Authenticity First', desc: 'We never compromise on product authenticity. Every product is sourced from authorized distributors and verified before it reaches you.', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
            { icon: Heart, title: 'Customer Wellbeing', desc: 'Your health is our priority. We offer free expert consultation to ensure you choose products that are safe and effective for your goals.', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
            { icon: Award, title: 'Quality Over Quantity', desc: 'We curate our catalog carefully. We\'d rather stock 100 verified products than 1,000 questionable ones.', color: 'text-brand-400', bg: 'bg-brand-500/10 border-brand-500/20' },
            { icon: Users, title: 'Community Driven', desc: 'We\'re more than a store — we\'re a community of fitness enthusiasts supporting each other on the journey to better health.', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
          ].map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className={`flex gap-4 p-5 rounded-2xl border ${bg}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color} ${bg}`}><Icon size={22} /></div>
              <div><h3 className="text-white font-semibold mb-1">{title}</h3><p className="text-dark-200 text-sm">{desc}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="card p-8 mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Certifications & Authorizations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['FSSAI Licensed', 'GST Registered', 'Authorized Retailer', 'ISO Compliant'].map(cert => (
            <div key={cert} className="flex items-center gap-2 p-3 bg-dark-700 rounded-xl">
              <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
              <span className="text-dark-200 text-sm font-medium">{cert}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Ready to start your journey?</h2>
        <p className="text-dark-300 mb-6">Browse our collection of 100% authentic supplements</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/catalog" className="btn-primary">Shop Now <ArrowRight size={16} /></Link>
          <Link to="/authorization" className="btn-secondary">View Authorization</Link>
        </div>
      </div>
    </div>
  );
}
