export const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

export const getDiscount = (price, comparePrice) =>
  comparePrice ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

export const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

export const truncate = (text, len = 80) => text.length > len ? text.slice(0, len) + '...' : text;

export const debounce = (fn, delay) => {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
};
