import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link } from '@mui/material';
import { Link as RouterLink, useParams, useHref } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRoomById } from '../../../store/rooms';
import { getUserById } from '../../../store/users';

const RoomBreadcrumbDisplay = ({roomId}) => {
  const room = useSelector(getRoomById(roomId));
  return <span>Room {room?.roomNumber}</span>;
};

const UserBreadcrumbDisplay = ({userId}) => {
  const user = useSelector(getUserById(userId));
  return <span>{user?.firstName} {user?.secondName}</span>;
};

const UserRouteBreadcrumbDisplay = ({route}) => {
  let routeBreadcrumbText;
  switch (route) {
    case 'booking':
      routeBreadcrumbText = 'My bookings';
      break;
    case 'dashboard':
      routeBreadcrumbText = 'Admin panel';
      break;
    case 'likes':
      routeBreadcrumbText = 'Likes';
      break;
    case 'favorites':
      routeBreadcrumbText = 'Favorites';
      break;
    case 'edit':
      routeBreadcrumbText = 'Edit profile';
      break;
    default:
      routeBreadcrumbText = '';
      break;
  }
  return <span>{routeBreadcrumbText}</span>;
};

const breadcrumbText = {
  '/': 'Main',
  '/rooms/': 'Rooms',
  '/profile/': 'Profile',
  'roomId': (roomId) => <RoomBreadcrumbDisplay roomId={roomId}/>,
  'userId': (userId) => <UserBreadcrumbDisplay userId={userId}/>,
  'route': (route) => <UserRouteBreadcrumbDisplay route={route}/>,
}

const LinkRouter = (props) => (
  <Link
    {...props}
    className='breadcrumbs-item'
    underline='hover'
    component={RouterLink}
    color='inherit'
  />
);

const Breadcrumbs = () => {
  const params = useParams();
  const href = useHref();

  const breadcrumbs = href.split('/');
  let link = '';

  // const breadcrumbItem = (breadcrumb) =>
  //   params?.roomId && params.roomId === breadcrumb ? <RoomBreadcrumbDisplay roomId={params.roomId}/> : breadcrumbText[link];

  const breadcrumbItem = (breadcrumb) => {
    const paramsNames = Object.keys(params);
    const paramsValues = Object.values(params);

    if (paramsNames.length > 0 && paramsValues.includes(breadcrumb)) {
      const paramName = paramsNames[paramsValues.indexOf(breadcrumb)];
      return breadcrumbText[paramName](breadcrumb);
    } else {
      return breadcrumbText[link]
    }
  };

  return (
    <div className="breadcrumbs">
      <MuiBreadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => {
          const last = index === breadcrumbs.length - 1;
          link += `${breadcrumb}/`;
          return last ? (
            <span className="breadcrumbs-item--last" key={breadcrumb}>
              {breadcrumbItem(breadcrumb)}
            </span>
          ) : (
            <span key={breadcrumb}>
              <LinkRouter key={breadcrumb} to={link}>
                {breadcrumbItem(breadcrumb)}
              </LinkRouter>
            </span>
          );
        })}

      </MuiBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
