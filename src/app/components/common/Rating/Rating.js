import { Rating as MuiRating } from '@mui/material';
import React, { useCallback, useMemo } from 'react';

const Rating = ({ onChange, name, value, totalCount = 1, precision, ...rest }) => {
  const getRating = useCallback(
    value => (precision ? +(value / totalCount).toFixed(2) : +Math.ceil(value / totalCount).toFixed()),
    [totalCount, precision]
  );

  const ratingValue = useMemo(() => getRating(value), [getRating, value]);

  return (
    <MuiRating
      name={name}
      value={ratingValue}
      className='rating-wrapper'
      onChange={onChange}
      precision={precision}
      {...rest}
    />
  );
};

export default Rating;
