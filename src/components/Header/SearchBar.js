import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
    <div className="search-bar-container" style={{ position: 'relative' }}>
      <input
        className="search-bar"
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={e => { setQuery(e.target.value); setShowDropdown(true); }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 120)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      {showDropdown && filtered.length > 0 && (
        <div className="search-dropdown">
          {filtered.slice(0, 8).map((product, idx) => (
            <div
              key={product.id}
              className={`search-dropdown-item${idx === highlighted ? ' highlighted' : ''}`}
              onMouseDown={() => handleSelect(product)}
              onMouseEnter={() => setHighlighted(idx)}
            >
              <img src={product.image} alt={product.title || product.name} className="search-dropdown-img" />
              <span>{product.title || product.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar; 