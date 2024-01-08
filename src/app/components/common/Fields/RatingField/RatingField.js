import React, { useState } from 'react';
import Rating from '../../Rating';

// const labels = {
//   'Disappoint':  1,
//   'Satisfactorily': 2,
//   'Well': 3,
//   'Very well': 4,
//   'Excellent': 5,
// }
const labels = {
  1: 'Disappoint',
  2: 'Satisfactorily',
  3: 'Well',
  4: 'Very well',
  5: 'Excellent'
}

const RatingField = ({ name, label, value, onChange, ...rest }) => {
  const [hover, setHover] = useState(-1);

  return (
    <div className='rating-wrapper' role='group'>
      <legend className='rating-label'>{label}</legend>
      <Rating
        name={name}
        value={value}
        {...rest}
        onChange={onChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && <div className='rating-feedback'>{labels[hover !== -1 ? hover : value ? value : 0]}</div>}
    </div>
  );
};

export default RatingField;
