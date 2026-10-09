const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Name, email, and message are required.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email address.' });
  console.log('📧 Contact form:', { name, email, phone, message, time: new Date().toISOString() });
  res.json({ success: true, message: 'Message received! Our team will respond within 24 hours.' });
});

module.exports = router;
