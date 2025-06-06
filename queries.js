const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Add this line to define the products array
let products = [];

// Middleware
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const { validateProduct } = require('./middleware/validation');
const errorHandler = require('./middleware/errorHandler');


// Middleware setup
router.use(logger);
router.use(auth);

// === CRUD ROUTES ===

// Get all products
router.get('/products', (req, res) => {
  let { category, page = 1, limit = 10 } = req.query;
  let filtered = [...products];

  // Filter by category
  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Pagination
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginated = filtered.slice(start, end);

  res.json({
    total: filtered.length,
    page: parseInt(page),
    limit: parseInt(limit),
    products: paginated
  });
});

// Get product by ID
router.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Create new product
router.post('/products', validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update product
router.put('/products/:id', validateProduct, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// Delete product
router.delete('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});


// Search products by name
router.get('/products/search', (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Please provide a search term (name).' });
  }
  const results = products.filter(p =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );
  res.json({ results });
});

// Get product statistics
router.get('/products/stats', (req, res) => {
  const stats = {};
  products.forEach(p => {
    const cat = p.category.toLowerCase();
    stats[cat] = (stats[cat] || 0) + 1;
  });
  res.json({ totalProducts: products.length, countByCategory: stats });
});

// Global error handler
router.use(errorHandler);

module.exports = router;
