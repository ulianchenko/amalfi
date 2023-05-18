import React from 'react';
import { Badge as MuiBadge } from '@mui/material';

const Badge = ({ children, className, ...rest }) => {
  return (
    <MuiBadge className={className} {...rest}>
      {children}
    </MuiBadge>
  );
};

export default Badge;
