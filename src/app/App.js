import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadRoomsList } from '../app/store/rooms';
import AppRouter from './router/AppRouter';
// import './scss/app.scss';
import theme from './theme';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRoomsList());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;