// import React from 'react';
// import { useParams, Link } from 'react-router-dom';

// const Rooms = () => {
//   const { roomId } = useParams();
//   console.log(roomId);

//   return (
//     <>
//       <div>Rooms page</div>
//       {roomId ? <div>RoomID: {roomId}</div> : <div>All rooms</div>}
//       <div>
//         <Link to={'33'}>Go to room #33</Link>
//       </div>
//       <div>
//         <Link to={'..'}>Go up</Link>
//       </div>
//       <div>
//         <Link to={'.'}>Go up</Link>
//       </div>
//       <div>
//         <Link to={'/'}>Go home</Link>
//       </div>
//     </>
//   );
// };

// export default Rooms;

import React from 'react';
import { useParams } from 'react-router';
// import Breadcrumbs from '../components/common/Breadcrumbs';
// import Container from '../components/common/Container';
import { Container } from '@mui/material';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import RoomPage from '../components/pages/RoomPage';
import RoomsPage from '../components/pages/RoomsPage';

const Rooms = () => {
  const { roomId } = useParams();

  return (
    <>
      <Header />
      <Container>
        {/* <Breadcrumbs /> */}
        {roomId ? <RoomPage roomId={roomId} /> : <RoomsPage />}
      </Container>
      <Footer />
    </>
  );
};

export default Rooms;
