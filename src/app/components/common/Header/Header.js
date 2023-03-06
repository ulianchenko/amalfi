import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from '@mui/material';
import { navigationRoutes } from '../../../router/AppRouter';
import Button from '../Button';
import Logo from '../Logo';
import NavList from '../NavList';

const Header = () => {

  return (
    <header className='header'>
      <Container>
        <div className='header__inner'>
          <Logo className='header__logo' />
          <NavList routes={navigationRoutes} className='header-nav' />
            <div className='header-buttons'>
              <NavLink to='/login/signIn' className='header-buttons-button'>
                <Button size='small' variant='outlined'>Sign In</Button>
              </NavLink>
              <NavLink to='/login/signUp' className='header-buttons-button'>
                <Button size='small'>Sign Up</Button>
              </NavLink>
            </div>
        </div>
      </Container>
    </header>
  );
};

export default React.memo(Header);