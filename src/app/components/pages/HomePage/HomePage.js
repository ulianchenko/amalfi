import React from 'react';
import { Container, Paper } from '@mui/material';
import { SearchRoomsForm } from '../../ui/forms';

const HomePage = () => {
  return (
    <main className='main-home__page'>
      <Container>
        <div className='main-home__wrapper'>
          <h1 className='visually-hidden'>Search rooms</h1>
          <Paper elevation={3} className='form-card searchRooms-form'>
            <h2>Find room according to your wishes</h2>
            <SearchRoomsForm />
          </Paper>
          <p className='main__text-wishes'>The best rooms for your work, leisure and inspiration</p>
        </div>
      </Container>
    </main>
  );
};

export default HomePage;