import { Slider } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import InputField from '../InputField';

const valuetext = (value) => {
  return `${value}€`;
};

const RangeSliderField = ({
  label,
  name,
  description,
  onChange,
  value = [],
  min = 0,
  max = 1000,
  minDistance = 50,
}) => {
  const [sliderValue, setSliderValue] = useState(value.map(Number));

  const handleChange = useCallback(
    (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }
      if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], max - minDistance);
          setSliderValue([clamped, clamped + minDistance]);
        } else {
          const clamped = Math.max(newValue[1], minDistance);
          setSliderValue([clamped - minDistance, clamped]);
        }
      } else {
        setSliderValue(newValue);
      }
    },
    [max, minDistance]
  );

  const handleInputChange = (event) => {
    if (event.target.name === 'max') {
      onChange({ target: { name, value: [sliderValue[0], +event.target.value] } });
    }
    if (event.target.name === 'min') {
      onChange({ target: { name, value: [+event.target.value, sliderValue[1]] } });
    }
  };

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  if (value) {
    return (
      <div>
        <div className='rangeSlider-header'>
          <p className='rangeSlider-header__label'>{label || 'Range Slider'}</p>
          <p className='rangeSlider-header__value'>
            {value[0]}€ - {value[1]}€
          </p>
        </div>
        <Slider
          name={name}
          value={sliderValue}
          valueLabelFormat={valuetext}
          onChange={handleChange}
          valueLabelDisplay='auto'
          min={min}
          max={max}
          step={100}
          onChangeCommitted={() => onChange({ target: { name: name || '', value: sliderValue } })}
        />
        <div className='rangeSlider__inputs'>
          <InputField
            inputProps={{ min: min }}
            label='From'
            name='min'
            type='number'
            value={String(value[0])}
            onChange={handleInputChange}
          />
          <InputField
            name='max'
            label='To'
            type='number'
            inputProps={{ max: max }}
            value={String(value[1])}
            onChange={handleInputChange}
          />
        </div>

        {description && <p className='rangeSlider__description'>One night stay in the room cost</p>}
      </div>
    );
  }
  return <CircularProgress />;
};

export default React.memo(RangeSliderField);
