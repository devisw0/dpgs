import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function ProductCard({ image, name, price, onSale, exclusive, rating, brand, stock, discount, category, onClick, newArrival }) {
  const chips = [];
  if (onSale) chips.push({ label: 'On Sale', color: 'secondary' });
  if (exclusive) chips.push({ label: 'Exclusive', color: 'primary' });
  if (newArrival) chips.push({ label: 'New Arrival', color: 'success' });

  return (
    <Card sx={{ width: 240, minHeight: 340, m: 1, cursor: 'pointer', bgcolor: 'background.paper', boxShadow: 3 }} onClick={onClick} tabIndex={0}>
      <CardMedia
        component="img"
        height={160}
        image={image}
        alt={name}
        sx={{ objectFit: 'contain', bgcolor: 'background.default', height: 160 }}
      />
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          {chips.map((chip, idx) => (
            <Chip key={idx} label={chip.label} color={chip.color} size="small" />
          ))}
        </Stack>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>{name}</Typography>
        <Typography variant="body2" color="text.secondary">${price.toFixed(2)}{discount && <span style={{ color: '#ff6f61', marginLeft: 4 }}> -{discount}%</span>}</Typography>
        {category && <Typography variant="caption" color="text.secondary">Category: {category}</Typography>}
        {brand && <Typography variant="caption" color="text.secondary">Brand: {brand}</Typography>}
        {typeof stock === 'number' && <Typography variant="caption" color="text.secondary">Stock: {stock}</Typography>}
        {rating && (
          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
            <Rating value={rating.rate} precision={0.1} readOnly size="small" />
            <Typography variant="caption" color="text.secondary">{rating.rate.toFixed(1)} ({rating.count})</Typography>
          </Stack>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {/* Add action buttons if needed */}
      </CardActions>
    </Card>
  );
}

export default ProductCard; 