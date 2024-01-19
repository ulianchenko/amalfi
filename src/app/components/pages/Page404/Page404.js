import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Button from '../../common/Button';
import Footer from '../../common/Footer';
import Header from '../../common/Header';

const Page404 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
      <Header />
      <Container>
        <main className='page404__main'>
          <h2 className='page404__title'>404 Error. Page not found :(</h2>
          <Button className='page404__button' onClick={handleGoHome}>
            Home page
          </Button>
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default Page404;
