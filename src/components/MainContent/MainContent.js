import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './MainContent.css';
import { Outlet } from 'react-router-dom';

function MainLayout({ products, onSelectProduct, selectedProduct, setSelectedProduct }) {
  return (
    <div className="homepage-layout">
      <Header products={products} onSelectProduct={onSelectProduct} />
      <div className="main-area">
        <Sidebar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout; 