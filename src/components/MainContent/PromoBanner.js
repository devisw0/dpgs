import React from 'react';

function PromoBanner({ title, description, buttonText, imageUrl, size = 'normal', onButtonClick }) {
  return (
    <div className={`promo-banner${size === 'small' ? ' promo-banner-small' : ''}`} style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="promo-overlay">
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="promo-btn" onClick={onButtonClick}>{buttonText} <span>&rarr;</span></button>
      </div>
    </div>
  );
}

export default PromoBanner; 