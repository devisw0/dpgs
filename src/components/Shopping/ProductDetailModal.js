import React, { useContext, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { CartContext } from '../../CartContext';

function ProductDetailModal({ product, onClose }) {
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [product, onClose]);

  if (!product) return null;
  const { title, price, image, description, rating, category, onSale, exclusive, newArrival } = product;
  const chips = [];
  if (onSale) chips.push({ label: 'On Sale', color: 'secondary' });
  if (exclusive) chips.push({ label: 'Exclusive', color: 'primary' });
  if (newArrival) chips.push({ label: 'New Arrival', color: 'success' });

  const handleAddToCart = () => {
    setCart([...cart, product]);
    // Optionally close the modal or show a message
    // onClose();
  };

  return (
    <Dialog open={!!product} onClose={onClose} maxWidth="md" fullWidth>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, bgcolor: 'background.paper', position: 'relative', minHeight: 340 }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
        >
          <CloseIcon />
        </IconButton>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{ width: { xs: '100%', md: 340 }, height: 340, objectFit: 'contain', bgcolor: 'background.default' }}
        />
        <CardContent sx={{ flex: 1, pb: 8 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {chips.map((chip, idx) => (
              <Chip key={idx} label={chip.label} color={chip.color} size="small" />
            ))}
          </Stack>
          <Typography variant="h5" fontWeight={700} gutterBottom>{title}</Typography>
          {category && <Typography variant="subtitle2" color="text.secondary">Category: {category}</Typography>}
          <Typography variant="h6" color="primary" sx={{ mt: 1 }}>${price?.toFixed(2)}</Typography>
          {rating && (
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
              <Rating value={rating.rate} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">({rating.rate?.toFixed(1) || 0})</Typography>
            </Stack>
          )}
          {description && <Typography variant="body1" sx={{ mt: 2 }}>{description}</Typography>}
        </CardContent>
        <CardActions sx={{ position: 'absolute', bottom: 16, right: 24, gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 150, fontWeight: 600, backgroundColor: 'primary.main', color: 'black', '&:hover': { backgroundColor: 'black', color: 'primary.main', border: '2px solid', borderColor: 'primary.main' } }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button
            variant="contained"
            sx={{ width: 150, fontWeight: 600, backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'primary.main', color: 'black', border: '2px solid', borderColor: 'black' } }}
          >
            Add to Wishlist
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
}

export default ProductDetailModal; 