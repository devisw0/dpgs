import React from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import HeaderIcons from './HeaderIcons';
import './Header.css';

function Header({ products = [], onSelectProduct }) {
  return (
    <header className="header">
      <Logo />
      <SearchBar products={products} onSelectProduct={onSelectProduct} />
      <HeaderIcons />
    </header>
  );
}

export default Header; 