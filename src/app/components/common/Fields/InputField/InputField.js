import React from 'react';
import { TextField } from '@mui/material';

const InputField = ({ label, type = 'text', name, value, onChange, error = null, ...rest }) => {
  return (
    <TextField
      variant='outlined'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      {...rest}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default React.memo(InputField);
