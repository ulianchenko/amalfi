import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getCurrentUserData } from '../../../store/users';
import Sidebar from '../../common/Sidebar';
import ProfileContentProxy from '../../ui/profile/ProfileContentProxy';

const ProfilePage = () => {
  const { userId, route } = useParams();
  const currentUser = useSelector(getCurrentUserData());
  // console.log('ProfilePage userId: ', userId);
  // console.log('ProfilePage route: ', route);
  // console.log('ProfilePage currentUser: ', currentUser);

  return (
    <div className='profile-page'>
      {currentUser?._id === userId && (
        <aside className='profile-sidebar'>
          <Sidebar />
        </aside>
      )}
      <ProfileContentProxy userId={userId} route={route} />
    </div>
  );
};

export default ProfilePage;
