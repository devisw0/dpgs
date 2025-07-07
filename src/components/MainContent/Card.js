import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function MainCard({ title, description, buttonText, onButtonClick, children, image, imageHeight = 180, cardWidth }) {
  return (
    <Card sx={{ maxWidth: cardWidth || 345, m: 2, bgcolor: 'background.paper', boxShadow: 4, flex: 1 }}>
      {image && (
        <CardMedia
          component="img"
          height={imageHeight}
          image={image}
          alt={title}
        />
      )}
      <CardContent>
        {children && <div>{children}</div>}
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={onButtonClick} endIcon={<span>&rarr;</span>}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}

export default MainCard; 