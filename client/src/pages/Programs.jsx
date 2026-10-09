import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, Dumbbell, Zap, Heart, Trophy } from 'lucide-react';

const programs = [
  {
    icon: Dumbbell,
    title: 'Muscle Building Stack',
    tag: 'Beginner to Advanced',
    color: 'from-red-600 to-orange-600',
    border: 'border-red-500/30',
    bg: 'bg-red-500/10',
    desc: 'A complete 12-week muscle building supplement program curated by our experts. Includes protein, creatine, pre-workout, and recovery support.',
    includes: ['Whey Protein (1.5kg)', 'Creatine Monohydrate (400g)', 'Pre-Workout (30 servings)', 'BCAA (30 servings)', 'Weekly check-ins with our expert'],
    price: '₹6,999',
    comparePrice: '₹9,500',
  },
  {
    icon: Zap,
    title: 'Fat Loss Stack',
    tag: 'Intermediate',
    color: 'from-orange-600 to-yellow-500',
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/10',
    desc: 'Science-backed fat loss supplement protocol. Combines lean protein, thermogenics, and performance support to preserve muscle while burning fat.',
    includes: ['Whey Isolate (1kg)', 'Fat Burner (60 caps)', 'Pre-Workout (30 servings)', 'Omega-3 Fish Oil (60 softgels)', 'Custom diet advice'],
    price: '₹5,499',
    comparePrice: '₹7,800',
  },
  {
    icon: Heart,
    title: 'Health & Wellness Stack',
    tag: 'All Levels',
    color: 'from-green-600 to-teal-600',
    border: 'border-green-500/30',
    bg: 'bg-green-500/10',
    desc: 'Foundational health support for everyday wellness. Covers immunity, joint health, gut health, and micronutrient gaps.',
    includes: ['Multivitamin (60 tabs)', 'Omega-3 Fish Oil (60 softgels)', 'Vitamin D3+K2 (60 caps)', 'Probiotic support', 'Health consultation'],
    price: '₹2,499',
    comparePrice: '₹3,800',
  },
  {
    icon: Trophy,
    title: 'Athletic Performance Stack',
    tag: 'Advanced',
    color: 'from-blue-600 to-purple-600',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    desc: 'Elite performance nutrition for serious athletes competing in sport. Optimized for strength, speed, endurance, and recovery.',
    includes: ['Hydrolyzed Whey Isolate (2kg)', 'Creatine (400g)', 'EAA (30 servings)', 'Pre-Workout (30 servings)', 'Sports dietitian consultation'],
    price: '₹9,999',
    comparePrice: '₹14,000',
  },
];

export default function Programs() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="section-title mb-2">Supplement <span className="text-gradient">Programs</span></h1>
        <p className="section-subtitle max-w-xl mx-auto">Expert-curated supplement stacks for every goal. Take the guesswork out of supplementation with our proven programs.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {programs.map(prog => (
          <div key={prog.title} className={`card border ${prog.border} p-6 hover:scale-[1.01] transition-transform`}>
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${prog.color} flex items-center justify-center flex-shrink-0`}>
                <prog.icon size={22} className="text-white" />
              </div>
              <div>
                <div className={`${prog.bg} ${prog.border} border text-xs font-semibold px-2 py-1 rounded-full inline-block mb-1`} style={{ color: 'inherit' }}>
                  <span className="text-dark-200">{prog.tag}</span>
                </div>
                <h3 className="text-white font-bold text-lg leading-tight">{prog.title}</h3>
              </div>
            </div>
            <p className="text-dark-200 text-sm leading-relaxed mb-4">{prog.desc}</p>
            <div className="mb-5">
              <div className="text-dark-400 text-xs uppercase tracking-wide font-semibold mb-2">What's included</div>
              <ul className="space-y-1.5">
                {prog.includes.map(item => (
                  <li key={item} className="flex items-center gap-2 text-dark-200 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-white">{prog.price}</span>
                <span className="text-dark-400 line-through text-sm ml-2">{prog.comparePrice}</span>
              </div>
              <a href={`https://wa.me/919999999999?text=Hi! I'm interested in the ${prog.title} program`}
                target="_blank" rel="noreferrer"
                className="btn-primary text-sm px-4 py-2.5">
                <MessageCircle size={16} /> Enquire
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Custom program CTA */}
      <div className="text-center p-10 bg-gradient-to-br from-brand-900/50 to-dark-800 border border-brand-800/50 rounded-3xl">
        <h2 className="text-2xl font-bold text-white mb-3">Need a Custom Program?</h2>
        <p className="text-dark-200 mb-6 max-w-lg mx-auto">Our certified nutrition experts will build a personalized supplement plan tailored to your body, goals, diet, and budget — completely free.</p>
        <a href="https://wa.me/919999999999?text=Hi! I need a custom supplement program" target="_blank" rel="noreferrer"
          className="btn-primary text-base px-8 py-4">
          <MessageCircle size={20} /> Get a Free Custom Plan
        </a>
      </div>
    </div>
  );
}
