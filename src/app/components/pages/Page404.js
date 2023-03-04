import React from 'react';
import {useNavigate} from 'react-router-dom';

const Page404 = () => {
  let navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
      <div>OOOPS! Something went wrong</div>
      <button onClick={handleGoHome}>Go home</button>
    </>
  );
};

export default Page404;