import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';

function ProductGrid({ products, onProductClick }) {
  return (
    <Grid container spacing={3} justifyContent="center">
      {products.map(product => (
        <Grid item key={product.id}>
          <ProductCard {...product} onClick={() => onProductClick(product)} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductGrid; 