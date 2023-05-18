import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '../Button';

const Counter = ({ name, label, value, min, max, onChange }) => {
  const handleIncrease = (e) => {
    e.preventDefault();
    if (+value >= max) return;
    onChange({ target: { name: name, value: Number(value) + 1 } });
  };
  const handleDecrease = (e) => {
    e.preventDefault();
    if (+value <= min) return;
    onChange({ target: { name: name, value: +value - 1 } });
  };

  return (
    <div className='counter-wrapper'>
      {label && <p className='counter-label'>{label}</p>}
      <div className='counter-buttons__wrapper'>
        <Button variant='contained' size='small' aria-label='reduce' onClick={handleDecrease} rounded>
          <RemoveIcon fontSize='small' />
        </Button>
        <input className='counter-input' type='text' value={value} readOnly />
        <Button variant='contained' size='small' aria-label='increase' onClick={handleIncrease} rounded>
          <AddIcon fontSize='small' />
        </Button>
      </div>
    </div>
  );
};

export default Counter;
