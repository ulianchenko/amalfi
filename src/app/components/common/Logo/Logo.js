import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as AmalfiLogo } from '../../../assets/svg/logo.svg';

const Logo = ({ className }) => {
  return (
    <div className={className}>
      <NavLink to='/' className='logo-link'>
        <AmalfiLogo />
      </NavLink>
    </div>
  );
};

export default Logo;
