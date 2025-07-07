import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Logo from './Logo';
import SearchBar from './SearchBar';
import HeaderIcons from './HeaderIcons';

function Header({ products = [], onSelectProduct }) {
  return (
    <AppBar position="static" elevation={2} sx={{ zIndex: 1201, backgroundColor: '#000 !important' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '64px', px: 3 }}>
        <Logo />
        <Box sx={{ flex: 1, mx: 4 }}>
          <SearchBar products={products} onSelectProduct={onSelectProduct} />
        </Box>
        <HeaderIcons />
      </Toolbar>
    </AppBar>
  );
}

export default Header; 