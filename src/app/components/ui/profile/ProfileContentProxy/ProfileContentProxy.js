import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { getCurrentUserData } from '../../../../store/users';
import AdminDashboard from '../AdminDashboard';
import ProfileBooking from '../ProfileBooking';
import ProfileEdit from '../ProfileEdit';
import ProfileFavorites from '../ProfileFavorites';
import ProfileLikes from '../ProfileLikes';
import UserProfile from '../UserProfile';

const ProfileContentProxy = ({ userId, route }) => {
  const currentUser = useSelector(getCurrentUserData());
  const contentByType = {
    booking: <ProfileBooking />,
    likes: <ProfileLikes />,
    favorites: <ProfileFavorites />,
    edit: currentUser?._id === userId ? <ProfileEdit /> : <Navigate to={`/profile/${currentUser?._id}`} />,
    dashboard: currentUser?.role === 'admin' ? <AdminDashboard /> : <Navigate to={`/profile/${currentUser?._id}`} replace={true} />,
  };

  const CurrentProfileContent = () => contentByType[route] || <UserProfile userId={userId} />;

  return (
    <>
      <CurrentProfileContent />
    </>
  );
};

export default ProfileContentProxy;
