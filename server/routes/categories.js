const express = require('express');
const router = express.Router();
const categories = require('../data/categories.json');
router.get('/', (req, res) => res.json(categories));
router.get('/:id', (req, res) => {
  const cat = categories.find(c => c.id === req.params.id);
  if (!cat) return res.status(404).json({ error: 'Category not found' });
  res.json(cat);
});
module.exports = router;
