import React, { useState, useRef, useEffect } from 'react';
import './PriceRangeSlider.css';

function PriceRangeSlider({ min, max, value, onChange }) {
  const [isDragging, setIsDragging] = useState(null); // 'min' or 'max' or null
  const [minInput, setMinInput] = useState(value.min.toFixed(2));
  const [maxInput, setMaxInput] = useState(value.max.toFixed(2));
  const sliderRef = useRef(null);

  useEffect(() => {
    setMinInput(value.min.toFixed(2));
    setMaxInput(value.max.toFixed(2));
  }, [value]);

  const handleStart = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(type);
  };

  const handleMove = (e) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newValue = Math.round((percentage * (max - min)) + min);

    if (isDragging === 'min') {
      const newMin = Math.min(newValue, value.max - 1);
      onChange({ ...value, min: newMin });
    } else if (isDragging === 'max') {
      const newMax = Math.max(newValue, value.min + 1);
      onChange({ ...value, max: newMax });
    }
  };

  const handleEnd = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging, value]);

  const handleInputChange = (type, inputValue) => {
    // Allow any text input, validate on blur
    if (type === 'min') {
      setMinInput(inputValue);
    } else if (type === 'max') {
      setMaxInput(inputValue);
    }
  };

  const handleInputBlur = (type) => {
    const inputValue = type === 'min' ? minInput : maxInput;
    const numValue = parseFloat(inputValue);
    
    if (isNaN(numValue)) {
      // Reset to current value if invalid
      if (type === 'min') {
        setMinInput(value.min.toFixed(2));
      } else {
        setMaxInput(value.max.toFixed(2));
      }
      return;
    }

    if (type === 'min') {
      const newMin = Math.min(Math.max(numValue, min), value.max - 1);
      onChange({ ...value, min: newMin });
      setMinInput(newMin.toFixed(2));
    } else if (type === 'max') {
      const newMax = Math.max(Math.min(numValue, max), value.min + 1);
      onChange({ ...value, max: newMax });
      setMaxInput(newMax.toFixed(2));
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const getMinPosition = () => ((value.min - min) / (max - min)) * 100;
  const getMaxPosition = () => ((value.max - min) / (max - min)) * 100;

  return (
    <div className="price-range-container">
      <div className="price-inputs">
        <input
          type="text"
          className="price-input"
          value={minInput}
          onChange={(e) => handleInputChange('min', e.target.value)}
          onBlur={() => handleInputBlur('min')}
          onKeyDown={handleInputKeyDown}
          placeholder={min.toFixed(2)}
        />
        <span className="price-separator">-</span>
        <input
          type="text"
          className="price-input"
          value={maxInput}
          onChange={(e) => handleInputChange('max', e.target.value)}
          onBlur={() => handleInputBlur('max')}
          onKeyDown={handleInputKeyDown}
          placeholder={max.toFixed(2)}
        />
      </div>
      <div className="slider-container" ref={sliderRef}>
        <div className="slider-track">
          <div 
            className="slider-fill"
            style={{
              left: `${getMinPosition()}%`,
              width: `${getMaxPosition() - getMinPosition()}%`
            }}
          />
        </div>
        <div
          className="slider-thumb slider-thumb-min"
          style={{ left: `${getMinPosition()}%` }}
          onMouseDown={(e) => handleStart(e, 'min')}
          onTouchStart={(e) => handleStart(e, 'min')}
        />
        <div
          className="slider-thumb slider-thumb-max"
          style={{ left: `${getMaxPosition()}%` }}
          onMouseDown={(e) => handleStart(e, 'max')}
          onTouchStart={(e) => handleStart(e, 'max')}
        />
      </div>
    </div>
  );
}

export default PriceRangeSlider; 