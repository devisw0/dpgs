import React from 'react';
import './ProductCard.css';

function ProductCard({ image, name, price, onSale, exclusive, rating, brand, stock, discount, category, onClick, newArrival }) {
  const chips = [];
  if (onSale) chips.push({ label: 'On Sale', className: 'sale' });
  if (exclusive) chips.push({ label: 'Exclusive', className: 'exclusive' });
  if (newArrival) chips.push({ label: 'New Arrival', className: 'new-arrival' });

  // Render stars for rating
  const renderStars = (rate) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= Math.round(rate) ? 'star filled' : 'star'}>★</span>
      );
    }
    return stars;
  };

  return (
    <div className="product-card" onClick={onClick} tabIndex={0}>
      <div className="product-chips">
        {chips.map((chip, idx) => (
          <span key={idx} className={`product-chip ${chip.className}`}>{chip.label}</span>
        ))}
      </div>
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="product-price">${price.toFixed(2)}{discount && <span className="product-discount"> -{discount}%</span>}</div>
        {category && <div className="product-category">Category: {category}</div>}
        {brand && <div className="product-brand">Brand: {brand}</div>}
        {typeof stock === 'number' && <div className="product-stock">Stock: {stock}</div>}
        {rating && (
          <div className="product-rating">
            {renderStars(rating.rate)}
            <span className="rating-num">{rating.rate.toFixed(1)}</span>
            <span className="rating-count">({rating.count})</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard; 