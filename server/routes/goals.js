const express = require('express');
const router = express.Router();
const goals = require('../data/goals.json');
router.get('/', (req, res) => res.json(goals));
router.get('/:id', (req, res) => {
  const goal = goals.find(g => g.id === req.params.id);
  if (!goal) return res.status(404).json({ error: 'Goal not found' });
  res.json(goal);
});
module.exports = router;
