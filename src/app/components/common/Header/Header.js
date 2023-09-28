import React from 'react';
import { useSelector } from 'react-redux';
import { getAuthErrors, getIsLoggedIn } from '../../../store/users';
import { NavLink } from 'react-router-dom';
import { Container, Divider } from '@mui/material';
import { navigationRoutes } from '../../../router/AppRouter';
import NavProfile from '../../ui/NavProfile';
import Button from '../Button';
import Logo from '../Logo';
import NavList from '../NavList';

const Header = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const authErrors = useSelector(getAuthErrors());

  return (
    <header className='header'>
      <Container>
        <div className='header__inner'>
          <Logo className='header__logo' />
          <NavList routes={navigationRoutes} className='header-nav' />
          {isLoggedIn && !authErrors ? (
            <>
            <Divider orientation='vertical' flexItem className='header__divider' />
            <NavProfile />
          </>
          ) : (
            <div className='header-buttons'>
              <NavLink to='/login/signIn' className='header-buttons-button'>
                <Button size='small' variant='outlined'>Sign In</Button>
              </NavLink>
              <NavLink to='/login/signUp' className='header-buttons-button'>
                <Button size='small'>Sign Up</Button>
              </NavLink>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default React.memo(Header);