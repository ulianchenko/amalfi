import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRoomsList } from './store/rooms';
import { loadReviewsList } from './store/reviews';
import { loadBookingsList } from './store/bookings';
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from './store/users';
import AppRouter from './router/AppRouter';
import './scss/app.scss';
import theme from './theme';

const App = () => {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());

  useEffect(() => {
    dispatch(loadUsersList());
    dispatch(loadRoomsList());
    dispatch(loadReviewsList());
    dispatch(loadBookingsList());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  if (!usersStatusLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    );
  } else {
    return <></>
  }
};

export default App;