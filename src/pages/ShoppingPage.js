import React, { useEffect, useState, useRef } from 'react';
import ProductGrid from '../components/Shopping/ProductGrid';
import ProductDetailModal from '../components/Shopping/ProductDetailModal';
import { useLocation, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import PriceRangeSlider from '../components/Shopping/PriceRangeSlider';
import './ShoppingPage.css';

const BASE_FILTERS = [
  { label: 'On Sale', value: 'onSale' },
  { label: 'Exclusive Collections', value: 'exclusive' },
  { label: 'New Arrivals', value: 'newArrival' },
];

const didSetFilterFromURL = { current: false };

function ShoppingPage({ products: propProducts, onProductClick }) {
  const [products, setProducts] = useState(propProducts || []);
  const [loading, setLoading] = useState(!propProducts);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const location = useLocation();
  const navigate = useNavigate();
  const userChangedFilters = useRef(false);

  // Extract unique categories for category filter chips
  const categories = Array.from(new Set(products.map(p => p.category))).filter(Boolean);
  const categoryFilters = categories.map(cat => ({ label: cat, value: `cat:${cat}` }));
  const FILTERS = [...BASE_FILTERS, ...categoryFilters];

  // Calculate price range from products
  const productPrices = products.map(p => p.price).filter(price => price !== undefined);
  const minPrice = Math.min(...productPrices, 0);
  const maxPrice = Math.max(...productPrices, 1000);

  useEffect(() => {
    if (propProducts && propProducts.length > 0) {
      setProducts(propProducts);
      setLoading(false);
      return;
    }
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        // Guarantee first 4 products are new arrivals for testing
        const marked = data.map((product, idx) => ({
          ...product,
          onSale: Math.random() < 0.3, // 30% chance
          exclusive: Math.random() < 0.2, // 20% chance
          newArrival: idx < 4 ? true : Math.random() < 0.4, // First 4 always newArrival
          isAccessory: ['jewelery', "women's jewelry", "men's jewelry", 'hats', 'bags'].includes(product.category?.toLowerCase()),
        }));
        setProducts(marked);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, [propProducts]);

  // Handle navigation state for automatic filter selection
  useEffect(() => {
    if (userChangedFilters.current) return;
    const searchParams = new URLSearchParams(location.search);
    const filter = searchParams.get('filter');
    if (!filter) return;
    let filterValue = '';
    switch (filter) {
      case 'exclusive':
        filterValue = 'exclusive';
        break;
      case 'sale':
        filterValue = 'onSale';
        break;
      case 'accessories':
        filterValue = 'cat:jewelery';
        break;
      case 'newArrivals':
        filterValue = 'newArrival';
        break;
      default:
        return;
    }
    if (filterValue) {
      setActiveFilters([filterValue]);
    }
  }, [location.search]);

  // Multi-select filter logic (AND) with price range
  let filteredProducts = products;
  if (activeFilters.length > 0 || priceRange.min > minPrice || priceRange.max < maxPrice) {
    filteredProducts = products.filter(p => {
      // Price range filter
      const price = p.price || 0;
      if (price < priceRange.min || price > priceRange.max) return false;
      
      // Other filters (AND logic)
      if (activeFilters.length > 0) {
        return activeFilters.every(f => {
          if (f === 'onSale') return p.onSale;
          if (f === 'exclusive') return p.exclusive;
          if (f === 'newArrival') return p.newArrival;
          if (f.startsWith('cat:')) return p.category === f.replace('cat:', '');
          return false;
        });
      }
      return true;
    });
  }

  const toggleFilter = (value) => {
    userChangedFilters.current = true;
    setActiveFilters((prev) =>
      prev.includes(value) ? prev.filter(f => f !== value) : [...prev, value]
    );
  };

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
  };

  if (loading) return <div className="shopping-page">Loading products...</div>;
  if (error) return <div className="shopping-page">{error}</div>;

  return (
    <Paper elevation={0} sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
      <Box className="filters-section" sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" className="filters-bar">
          {FILTERS.map(f => (
            <Chip
              key={f.value}
              label={f.label}
              clickable
              color={activeFilters.includes(f.value) ? 'primary' : 'default'}
              variant={activeFilters.includes(f.value) ? 'filled' : 'outlined'}
              onClick={() => toggleFilter(f.value)}
              sx={{
                fontWeight: 500,
                fontSize: '1rem',
                textTransform: 'capitalize',
                transition: 'background 0.2s, color 0.2s',
                '&:hover': activeFilters.includes(f.value)
                  ? { backgroundColor: 'primary.dark', color: 'white' }
                  : { backgroundColor: 'primary.main', color: 'white' },
              }}
            />
          ))}
          <Box sx={{ width: 320, ml: 3 }}>
            <PriceRangeSlider
              min={minPrice}
              max={maxPrice}
              value={priceRange}
              onChange={handlePriceRangeChange}
            />
          </Box>
        </Stack>
      </Box>
      <ProductGrid products={filteredProducts} onProductClick={onProductClick || setSelectedProduct} />
      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </Paper>
  );
}

export default ShoppingPage; 