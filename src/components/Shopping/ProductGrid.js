import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

function ProductGrid({ products, onProductClick }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          image={product.image}
          name={product.title || product.name}
          price={product.price}
          onSale={product.onSale}
          exclusive={product.exclusive}
          isAccessory={product.isAccessory}
          rating={product.rating}
          brand={product.brand}
          stock={product.rating?.count}
          discount={product.discount}
          category={product.category}
          onClick={() => onProductClick && onProductClick(product)}
        />
      ))}
    </div>
  );
}

export default ProductGrid; 