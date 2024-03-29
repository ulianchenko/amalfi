import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';

import validatorConfig from '../../../ui/forms/SearchRoomsForm/validatorConfig';

const DatePickerField = ({ label, name, value, minDate, onChange, error, ...rest }) => {
  const [datePickerError, setDatePickerError] = useState(null);
  const errorText = error ? error : datePickerError ? validatorConfig[name].isValidDate.message : null
  const convertToDefEventParam = (name, value) => {
    return {
      target: {
        name,
        value: new Date(Number(value)).getTime(),
      },
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
      <DatePicker
        format='DD/MM/YYYY'
        label={label}
        value={dayjs(value)}
        minDate={minDate ? dayjs(minDate) : dayjs()}
        slotProps={{ textField: {
          inputProps: { placeholder: 'DD/MM/YYYY' },
          helperText: errorText ? errorText : null,
        } }}
        onChange={date => {
          onChange(convertToDefEventParam(name, date));
        }}
        onError={(newDatePickerError) => setDatePickerError(newDatePickerError)}
      />
    </LocalizationProvider>
  );
};

export default React.memo(DatePickerField);
