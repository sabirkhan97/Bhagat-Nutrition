import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

const faqs = [
  { q: 'Are all products 100% authentic?', a: 'Absolutely. We source all products directly from authorized distributors and brand representatives. We maintain FSSAI compliance and direct brand authorizations.' },
  { q: 'How long does delivery take?', a: 'Most orders within Delhi NCR are delivered in 1–2 business days. Pan-India delivery typically takes 3–7 business days depending on your location.' },
  { q: 'Is Cash on Delivery (COD) available?', a: 'Yes, COD is available on all orders. However, prepaid orders get exclusive benefits: free gifts and flat ₹75 OFF on orders above ₹5,000.' },
  { q: 'What is the prepaid discount?', a: 'All prepaid orders (UPI, card, net banking) get a free gift included. Additionally, use code PREPAID75 on orders above ₹5,000 for ₹75 off. Freebies are only available on prepaid orders.' },
  { q: 'What is your return policy?', a: 'We accept returns within 7 days of delivery for sealed, unopened products. If a product is damaged in transit or appears tampered, we will replace it immediately at no extra cost.' },
  { q: 'Do you offer free shipping?', a: 'Yes! Free shipping on all orders above ₹999. A nominal ₹80 shipping fee applies to orders below ₹999.' },
  { q: 'How do I verify product authenticity?', a: 'Each product has a batch number and manufacturer\'s QR code. You can verify authenticity using the brand\'s official app. We also provide purchase receipts for all orders.' },
  { q: 'Can I get supplement advice?', a: 'Yes! Chat with our certified supplement expert on WhatsApp for personalized, unbiased recommendations based on your goals, diet, and budget — completely free.' },
  { q: 'What payment methods do you accept?', a: 'We accept UPI (Google Pay, PhonePe, Paytm), credit/debit cards (Visa, Mastercard, Rupay), net banking, and Cash on Delivery.' },
  { q: 'How do I track my order?', a: 'Once your order is shipped, you\'ll receive a tracking ID via email/SMS. Use the Track Order page on our website with your order ID or tracking number.' },
  { q: 'What if I receive a damaged product?', a: 'Contact us immediately via WhatsApp or email with photos. We will arrange a replacement or full refund within 48 hours — no questions asked.' },
  { q: 'Do you have a physical store?', a: 'Yes! Visit us at 341, 16 Nai Basti, Sector 8, Gurugram, Haryana 122001. Store hours: Mon–Sat 9AM–8PM, Sunday 10AM–6PM.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="section-title mb-2">Frequently Asked <span className="text-gradient">Questions</span></h1>
        <p className="section-subtitle">Everything you need to know about Bhagat Nutrition</p>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className={clsx('card border transition-all', open === i ? 'border-brand-500/50' : 'border-dark-700')}>
            <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpen(open === i ? null : i)}>
              <span className="text-white font-medium pr-4">{faq.q}</span>
              <ChevronDown size={18} className={clsx('text-dark-400 flex-shrink-0 transition-transform', open === i && 'rotate-180 text-brand-400')} />
            </button>
            {open === i && <div className="px-5 pb-5 text-dark-200 text-sm leading-relaxed">{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
