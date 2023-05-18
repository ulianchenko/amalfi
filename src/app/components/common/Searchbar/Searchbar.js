import React from 'react';
import { InputField } from '../Fields';

const Searchbar = ({ value, onChange }) => {
  return (
    <InputField
      name='searchbar'
      label='Search'
      placeholder='Search by room number...'
      value={value}
      onChange={onChange}
      style={{ flex: '1' }}
    />
  );
};

export default Searchbar;
