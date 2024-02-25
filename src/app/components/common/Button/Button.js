import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ size, color, variant, onClick, type, rounded, children, ...rest }) => {
  return (
    <MuiButton
      type={type || 'text'}
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      className={rounded ? 'button-circle' : 'button'}
      sx={{
        background: variant === 'outlined' ? 'transparent' : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      }}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;