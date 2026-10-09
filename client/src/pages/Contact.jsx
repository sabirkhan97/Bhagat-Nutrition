import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle } from 'lucide-react';
import { submitContact } from '../utils/api';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContact(form);
      setDone(true);
      toast.success('Message sent! We\'ll get back to you within 24 hours.');
    } catch {
      toast.error('Failed to send. Please try WhatsApp instead.');
    } finally { setSubmitting(false); }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="section-title mb-2">Contact <span className="text-gradient">Us</span></h1>
        <p className="section-subtitle">We're here to help with any questions or concerns</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Info */}
        <div className="space-y-6">
          {[
            { icon: MapPin, title: 'Store Address', desc: '341, 16 Nai Basti, near Mohit Thread Company, Sector 8, Gurugram, Haryana 122001', color: 'text-brand-400', bg: 'bg-brand-500/10 border-brand-500/20' },
            { icon: Phone, title: 'Phone', desc: '+91 99999 99999', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20', href: 'tel:+919999999999' },
            { icon: Mail, title: 'Email', desc: 'hello@bhagatnutrition.in', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', href: 'mailto:hello@bhagatnutrition.in' },
            { icon: Clock, title: 'Store Hours', desc: 'Mon–Sat: 9:00 AM – 8:00 PM\nSunday: 10:00 AM – 6:00 PM', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
          ].map(({ icon: Icon, title, desc, color, bg, href }) => (
            <div key={title} className={`flex gap-4 p-5 rounded-2xl border ${bg}`}>
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 ${color}`}><Icon size={22} /></div>
              <div>
                <div className="text-white font-semibold mb-1">{title}</div>
                {href ? <a href={href} className={`${color} hover:underline text-sm`}>{desc}</a> : <div className="text-dark-200 text-sm whitespace-pre-line">{desc}</div>}
              </div>
            </div>
          ))}

          <a href="https://wa.me/919999999999?text=Hi! I have a question about Bhagat Nutrition" target="_blank" rel="noreferrer"
            className="flex items-center gap-4 p-5 rounded-2xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0 text-green-400"><MessageCircle size={22} /></div>
            <div>
              <div className="text-white font-semibold">WhatsApp Support</div>
              <div className="text-green-400 text-sm">Chat now for instant response →</div>
            </div>
          </a>
        </div>

        {/* Form */}
        <div className="card p-8">
          {done ? (
            <div className="text-center py-10">
              <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
              <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
              <p className="text-dark-300">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-white mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-dark-300 text-sm mb-1.5 block">Name *</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} required placeholder="Your full name" className="input-field" />
                </div>
                <div>
                  <label className="text-dark-300 text-sm mb-1.5 block">Email *</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} required placeholder="your@email.com" className="input-field" />
                </div>
                <div>
                  <label className="text-dark-300 text-sm mb-1.5 block">Phone</label>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className="input-field" />
                </div>
                <div>
                  <label className="text-dark-300 text-sm mb-1.5 block">Message *</label>
                  <textarea value={form.message} onChange={e => set('message', e.target.value)} required rows={5} placeholder="How can we help you?" className="input-field resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full py-4">
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
