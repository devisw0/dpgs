const express = require('express');
const router = express.Router();

// Mock product data
const products = [
  {
    id: 1,
    name: 'Classic Denim Jacket',
    price: 59.99,
    category: 'new-arrivals',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Minimalist Accessories Set',
    price: 24.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Support Team Tee',
    price: 19.99,
    category: 'customer-service',
    image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'Exclusive Blazer',
    price: 89.99,
    category: 'exclusive-collection',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    name: 'Profile Knit Sweater',
    price: 39.99,
    category: 'profile',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    name: 'Sale Starry Tee',
    price: 14.99,
    category: 'sale',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 7,
    name: 'Fast Delivery Jacket',
    price: 49.99,
    category: 'fast-delivery',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
  },
];

// GET /products
router.get('/', (req, res) => {
  res.json(products);
});

module.exports = router; 