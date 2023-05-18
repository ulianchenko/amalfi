import React from 'react';
import { SelectField } from '../../../common/Fields';

const RoomsDisplayCount = ({ count, setCount, options }) => {
  return (
    <SelectField
      style={{ minWidth: '140px' }}
      name='pageSize'
      autoWidth={true}
      label='Display by'
      value={String(count)}
      onChange={e => setCount(e)}
      options={options}
    />
  );
};

export default RoomsDisplayCount;
