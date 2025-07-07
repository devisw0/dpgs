import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ShoppingPage from './pages/ShoppingPage';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ProductDetailModal from './components/Shopping/ProductDetailModal';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import MainLayout from './components/MainContent/MainContent';

export const DarkModeContext = createContext();
export const UserContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

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

  // Fetch user info on app load
  useEffect(() => {
    const fetchUser = async () => {
      setUserLoading(true);
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
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
      <Routes>
        {/* Standalone auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Main app layout as a layout route */}
        <Route
          element={
            <MainLayout
              products={products}
              onSelectProduct={onSelectProduct}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShoppingPage products={products} onProductClick={setSelectedProduct} />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    );
  }

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#a78bfa' },
      secondary: { main: '#ff6f61' },
      background: {
        default: darkMode ? '#18181b' : '#f7f7f7',
        paper: darkMode ? '#23232a' : '#fff',
      },
    },
    typography: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    },
  });

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <UserContext.Provider value={{ user, setUser, userLoading }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className={darkMode ? 'dark' : ''}>
            <Router>
              <AppRoutes />
            </Router>
          </div>
        </ThemeProvider>
      </UserContext.Provider>
    </DarkModeContext.Provider>
  );
}

export default App; 