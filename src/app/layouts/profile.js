import React from 'react';
import { useSelector } from 'react-redux';
// import { Redirect, useParams } from 'react-router';
import { Navigate, useParams } from 'react-router';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { Container } from '@mui/material';
import Footer from '../components/common/Footer/Footer';
import Header from '../components/common/Header/Header';
import ProfilePage from '../components/pages/ProfilePage';
import { getCurrentUserId } from '../store/users';

const Profile = () => {
  const { userId } = useParams();
  const currentUserId = useSelector(getCurrentUserId());
  // console.log(userId);

  return (
    <>
      <Header />
      <Container>
        <Breadcrumbs />
        {userId ? <ProfilePage /> : <Navigate to={`/profile/${currentUserId}`} replace={true} />}
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
