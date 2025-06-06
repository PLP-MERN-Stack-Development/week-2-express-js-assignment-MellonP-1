//import necessary modules
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// in-memory products array
const products = [
    {
        id: '1',
        name: 'T.V',
        description: 'A 50 inch LED TV',
        price: 2000,
        category: 'electronics',
        inStock: true
    },
    {
        id: '2',
        name: 'Laptop',
        description: '',
        price: 7000,
        category: 'electronics',
        inStock: true
    },
    {
        id: '3',
        name: 'Refrigerator',
        description: 'A 300L double door fridge',
        price: 15000,
        category: 'electronics',
        inStock: true
    },
    {
        id: '4',
        name: 'Washing Machine',
        description: 'A fully automatic washing machine',
        price: 12000,
        category: 'electronics',
        inStock: true
    },
    {
        id: '5',
        name: 'Microwave Oven',
        description: 'A 20L microwave oven',
        price: 5000,
        category: 'electronics',
        inStock: true
    }
];

//GET /api/products/:id - List all products
router.get('/', (req, res) => {
    res.json(products);
});

//GET /api/products/:id - Get a specific product
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    } 
    res.json(product);
});

//POST /api/products - Create a new product
router.post('/', (req, res) => {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = {
        id: uuidv4(),
        name,
        description,
        price,
        category,
        inStock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update a product
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const { name, description, price, category, inStock } = req.body;
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.inStock = inStock ?? product.inStock;

    res.json(product);
});

// DELETE /api/products/:id - Delete a product
router.delete('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    const deleted = products.splice(index, 1);
    res.json({ message: 'Product deleted', product: deleted[0] });
});

module.exports = router;