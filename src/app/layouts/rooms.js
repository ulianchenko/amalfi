import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Rooms = () => {
  const { roomId } = useParams();
  console.log(roomId);

  return (
    <>
      <div>Rooms page</div>
      {roomId ? <div>RoomID: {roomId}</div> : <div>All rooms</div>}
      <div>
        <Link to={'33'}>Go to room #33</Link>
      </div>
      <div>
        <Link to={'..'}>Go up</Link>
      </div>
      <div>
        <Link to={'.'}>Go up</Link>
      </div>
      <div>
        <Link to={'/'}>Go home</Link>
      </div>
    </>
  );
};

export default Rooms;