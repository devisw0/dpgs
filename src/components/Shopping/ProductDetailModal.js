import React, { useEffect } from 'react';
import './ProductDetailModal.css';

function ProductDetailModal({ product, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (product) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [product, onClose]);

  if (!product) return null;

  const { title, price, image, description, rating, category, onSale, exclusive, newArrival } = product;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-body">
          <div className="modal-image-container">
            <img src={image} alt={title} className="modal-image" />
            <div className="modal-badges">
              {onSale && <span className="modal-badge sale-badge">On Sale</span>}
              {exclusive && <span className="modal-badge exclusive-badge">Exclusive</span>}
              {newArrival && <span className="modal-badge new-arrival-badge">New Arrival</span>}
            </div>
          </div>
          
          <div className="modal-info">
            <h2 className="modal-title">{title}</h2>
            {category && <p className="modal-category">Category: {category}</p>}
            <div className="modal-price">${price?.toFixed(2)}</div>
            {rating && (
              <div className="modal-rating">
                <span className="stars">{'★'.repeat(Math.floor(rating.rate || 0))}</span>
                <span className="rating-number">({rating.rate?.toFixed(1) || 0})</span>
              </div>
            )}
            {description && <p className="modal-description">{description}</p>}
            
            <div className="modal-actions">
              <button className="modal-btn primary">Add to Cart</button>
              <button className="modal-btn secondary">Add to Wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal; 