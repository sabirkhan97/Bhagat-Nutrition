const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const ordersFile = path.join(__dirname, '../data/orders.json');
const getOrders = () => {
  try { return JSON.parse(fs.readFileSync(ordersFile, 'utf8')); }
  catch { return []; }
};
const saveOrders = (orders) => fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

// Create order
router.post('/', (req, res) => {
  const { items, customer, address, paymentMethod, couponCode } = req.body;
  if (!items || !customer || !address) return res.status(400).json({ error: 'Missing required fields' });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  let discount = 0;
  if (couponCode === 'PREPAID75' && paymentMethod !== 'cod' && subtotal >= 5000) discount = 75;
  if (couponCode === 'FIRST10') discount = Math.round(subtotal * 0.1);

  const shipping = subtotal >= 999 ? 0 : 80;
  const total = subtotal - discount + shipping;

  const order = {
    id: 'BN' + Date.now(),
    items, customer, address, paymentMethod,
    subtotal, discount, shipping, total,
    couponCode: couponCode || null,
    status: 'confirmed',
    paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    trackingId: 'BNTRACK' + Math.random().toString(36).substr(2, 8).toUpperCase(),
    freeGift: paymentMethod !== 'cod' && total >= 1000
  };

  const orders = getOrders();
  orders.push(order);
  saveOrders(orders);

  res.status(201).json({ success: true, order });
});

// Track order
router.get('/track/:id', (req, res) => {
  const orders = getOrders();
  const order = orders.find(o => o.id === req.params.id || o.trackingId === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

module.exports = router;
