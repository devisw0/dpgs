import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import './Header.css';

function SearchBar({ products = [], onSelectProduct }) {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef();

  const filtered = query
    ? products.filter(p => (p.title || p.name).toLowerCase().includes(query.toLowerCase()))
    : [];

  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (!showDropdown || filtered.length === 0) return;
    if (e.key === 'ArrowDown') {
      setHighlighted(h => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      setHighlighted(h => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      if (filtered[highlighted]) {
        onSelectProduct && onSelectProduct(filtered[highlighted]);
        setShowDropdown(false);
        setQuery('');
      }
    }
  };

  const handleSelect = (product) => {
    onSelectProduct && onSelectProduct(product);
    setShowDropdown(false);
    setQuery('');
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <TextField
        fullWidth
        variant="standard"
        placeholder="Search products..."
        value={query}
        onChange={e => { setQuery(e.target.value); setShowDropdown(true); }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 120)}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'white' }} />
            </InputAdornment>
          ),
          sx: {
            color: 'white',
            '::placeholder': { color: 'white', opacity: 1 },
            '& .MuiInputBase-input': { color: 'white' },
            '& .MuiInput-underline:before': { borderBottomColor: 'white' },
            '& .MuiInput-underline:after': { borderBottomColor: 'white' },
          },
        }}
        InputLabelProps={{ style: { color: 'white' } }}
      />
      {showDropdown && filtered.length > 0 && (
        <Paper elevation={4} sx={{ position: 'absolute', top: '110%', left: 0, width: '100%', zIndex: 20, maxHeight: 320, overflowY: 'auto' }}>
          {filtered.slice(0, 8).map((product, idx) => (
            <MenuItem
              key={product.id}
              selected={idx === highlighted}
              onMouseDown={() => handleSelect(product)}
              onMouseEnter={() => setHighlighted(idx)}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <img src={product.image} alt={product.title || product.name} style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 7, background: '#f3f4f6' }} />
              <span>{product.title || product.name}</span>
            </MenuItem>
          ))}
        </Paper>
      )}
    </div>
  );
}

export default SearchBar; 