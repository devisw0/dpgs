import React from 'react';

function Card({ title, description, buttonText, onButtonClick, children, image }) {
  return (
    <div className="card">
      {image && (
        <div className="card-image-container">
          <img src={image} alt={title} className="card-image" />
        </div>
      )}
      {children && <div className="card-extra">{children}</div>}
      <h2 className="card-title">{title}</h2>
      <p className="card-desc">{description}</p>
      <button className="card-btn" onClick={onButtonClick}>{buttonText} <span>&rarr;</span></button>
    </div>
  );
}

export default Card; 