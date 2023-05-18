import React from 'react';
import { SelectField } from '../../../common/Fields';

const roomsSortArray = [
  { name: 'Descending', value: { path: 'roomNumber', order: 'desc' } },
  { name: 'Ascending', value: { path: 'roomNumber', order: 'asc' } },
  { name: 'Popular', value: { path: 'countReviews', order: 'desc' } },
  { name: 'High ranking', value: { path: 'rate', order: 'desc' } },
  { name: 'Low price first', value: { path: 'price', order: 'asc' } },
  { name: 'High price first', value: { path: 'price', order: 'desc' } },
];

const RoomsSort = ({ sortBy, onSort }) => {
  return (
    <SelectField
      name='roomSort'
      style={{ minWidth: '200px' }}
      label='Sort'
      value={JSON.stringify(sortBy)}
      onChange={onSort}
      options={roomsSortArray}
    />
  );
};

export default RoomsSort;
