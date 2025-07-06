import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ShoppingPage from './pages/ShoppingPage';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ProductDetailModal from './components/Shopping/ProductDetailModal';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        // Randomly mark some products as onSale or exclusive for demo
        const marked = data.map(product => ({
          ...product,
          onSale: Math.random() < 0.3, // 30% chance
          exclusive: Math.random() < 0.2, // 20% chance
          isAccessory: ['jewelery', "women's jewelry", "men's jewelry", 'hats', 'bags'].includes(product.category?.toLowerCase()),
        }));
        setProducts(marked);
      });
  }, []);

  // For search bar: open modal and navigate to /shop if not already there
  function useProductSearchNavigate() {
    const navigate = useNavigate();
    return (product) => {
      navigate('/shop');
      setSelectedProduct(product);
    };
  }

  function AppRoutes() {
    const onSelectProduct = useProductSearchNavigate();
    return (
      <div className="homepage-layout">
        <Header products={products} onSelectProduct={onSelectProduct} />
        <div className="main-area">
          <Sidebar />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShoppingPage products={products} onProductClick={setSelectedProduct} />} />
            </Routes>
            <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App; 