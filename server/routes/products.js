const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

// GET all products with filtering, sorting, pagination
router.get('/', (req, res) => {
  let result = [...products];
  const { category, brand, goal, search, sort, minPrice, maxPrice, inStock, page = 1, limit = 12, featured, bestSeller, isNew } = req.query;

  if (category) result = result.filter(p => p.category === category);
  if (brand) result = result.filter(p => p.brand.toLowerCase().replace(/\s+/g, '-') === brand);
  if (goal) result = result.filter(p => p.goal && p.goal.includes(goal));
  if (inStock === 'true') result = result.filter(p => p.inStock);
  if (featured === 'true') result = result.filter(p => p.isFeatured);
  if (bestSeller === 'true') result = result.filter(p => p.isBestSeller);
  if (isNew === 'true') result = result.filter(p => p.isNew);
  if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q)) ||
      p.category.includes(q)
    );
  }

  // Sorting
  switch (sort) {
    case 'price-asc': result.sort((a, b) => a.price - b.price); break;
    case 'price-desc': result.sort((a, b) => b.price - a.price); break;
    case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    case 'popular': result.sort((a, b) => b.reviews - a.reviews); break;
    case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    default: result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  const total = result.length;
  const startIdx = (Number(page) - 1) * Number(limit);
  const paginated = result.slice(startIdx, startIdx + Number(limit));

  res.json({ products: paginated, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
});

// GET single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const related = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  res.json({ product, related });
});

module.exports = router;
