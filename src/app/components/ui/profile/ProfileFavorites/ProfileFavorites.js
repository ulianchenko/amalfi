import React from 'react';
import localStorageService from '../../../../services/localStorage.service';
import { getRoomsByIds } from '../../../../store/rooms';
import { useSelector } from 'react-redux';
import RoomsList from '../../rooms/RoomsList/RoomsList';

const ProfileFavorites = () => {
  const favoritesRoomIds = JSON.parse(localStorageService.getFavoritesRoom() || '{}');
  const rooms = useSelector(getRoomsByIds(favoritesRoomIds));
  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ marginBottom: '20px' }}>My favorite rooms</h1>
      {rooms.length > 0 ? <RoomsList rooms={rooms} /> : <h3>Empty list</h3>}
    </div>
  );
};

export default ProfileFavorites;
