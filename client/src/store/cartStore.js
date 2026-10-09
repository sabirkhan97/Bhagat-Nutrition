import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, variant, qty = 1) => {
        const { items } = get();
        const key = `${product.id}-${variant?.id || 'default'}`;
        const existing = items.find(i => i.key === key);
        if (existing) {
          set({ items: items.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i) });
        } else {
          set({ items: [...items, { key, product, variant, qty, price: variant?.price || product.price }] });
        }
      },

      removeItem: (key) => set(s => ({ items: s.items.filter(i => i.key !== key) })),

      updateQty: (key, qty) => {
        if (qty < 1) { get().removeItem(key); return; }
        set(s => ({ items: s.items.map(i => i.key === key ? { ...i, qty } : i) }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set(s => ({ isOpen: !s.isOpen })),

      get subtotal() { return get().items.reduce((sum, i) => sum + i.price * i.qty, 0); },
      get itemCount() { return get().items.reduce((sum, i) => sum + i.qty, 0); },
    }),
    { name: 'bhagat-cart' }
  )
);
