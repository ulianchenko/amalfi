import React from 'react';
// import { TextField } from '@mui/material';
import DatePickerField from '../DatePickerField';

const oneDayMs = 86400000;

const DateOfStay = ({ onChange, data, errors }) => {
  const { arrivalDate, departureDate } = data;

  return (
    <div className='dateOfStay-wrapper'>
      <div className='dateOfStay'>
        <DatePickerField
          label='Arrival'
          name='arrivalDate'
          minDate={+arrivalDate}
          onChange={onChange}
          value={+arrivalDate}
          error={errors?.arrivalDate}
          // renderInput={params => (
          //   <TextField {...params} {...(errors?.arrivalDate && { error: true, helperText: errors?.arrivalDate })} />
          // )}
        />
      </div>
      <div className='dateOfStay'>
        <DatePickerField
          label='Departure'
          name='departureDate'
          minDate={+arrivalDate + oneDayMs}
          onChange={onChange}
          value={+departureDate}
          error={errors?.departureDate}
          // renderInput={params => (
          //   <TextField {...params} {...(errors?.departureDate && { error: true, helperText: errors?.departureDate })} />
          // )}
        />
      </div>
    </div>
  );
};

export default DateOfStay;
