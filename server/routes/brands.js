const express = require('express');
const router = express.Router();
const brands = require('../data/brands.json');
router.get('/', (req, res) => res.json(brands));
router.get('/:id', (req, res) => {
  const brand = brands.find(b => b.id === req.params.id);
  if (!brand) return res.status(404).json({ error: 'Brand not found' });
  res.json(brand);
});
module.exports = router;
