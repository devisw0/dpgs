import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function PriceRangeSlider({ min, max, value, onChange }) {
  const handleSliderChange = (e, newValue) => {
    onChange({ min: newValue[0], max: newValue[1] });
  };

  const handleInputChange = (type, e) => {
    const val = parseFloat(e.target.value);
    if (isNaN(val)) return;
    if (type === 'min') {
      onChange({ min: Math.min(val, value.max - 1), max: value.max });
    } else {
      onChange({ min: value.min, max: Math.max(val, value.min + 1) });
    }
  };

  return (
    <Box>
      <Box sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        background: 'rgba(0,0,0,0.03)',
        borderRadius: 2,
        px: 1.5,
        py: 0.5,
        mb: 1,
      }}>
        <TextField
          size="small"
          type="number"
          value={value.min}
          onChange={e => handleInputChange('min', e)}
          inputProps={{ min, max: value.max - 1, step: 1, style: { width: 70, textAlign: 'center' } }}
          label="Min"
          variant="outlined"
        />
        <Box component="span" sx={{ mx: 0.5, fontWeight: 600, color: 'text.secondary', fontSize: '1.2rem' }}>–</Box>
        <TextField
          size="small"
          type="number"
          value={value.max}
          onChange={e => handleInputChange('max', e)}
          inputProps={{ min: value.min + 1, max, step: 1, style: { width: 70, textAlign: 'center' } }}
          label="Max"
          variant="outlined"
        />
      </Box>
      <Slider
        value={[value.min, value.max]}
        onChange={handleSliderChange}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        disableSwap
        sx={{ color: 'primary.main' }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'text.secondary', mt: -1 }}>
        <span>${min.toFixed(2)}</span>
        <span>${max.toFixed(2)}</span>
      </Box>
    </Box>
  );
}

export default PriceRangeSlider; 