import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link } from '@mui/material';
import { Link as RouterLink, useParams, useHref } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRoomById } from '../../../store/rooms';

const BreadcrumbDisplay = ({roomId}) => {
  const room = useSelector(getRoomById(roomId));
  return <span>Room {room?.roomNumber}</span>;
};

const breadcrumbText = {
  '/': 'Main',
  '/rooms': 'Rooms',
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
  let link = '/';

  const breadcrumbItem = (breadcrumb) => params?.roomId && params.roomId === breadcrumb ? <BreadcrumbDisplay roomId={params.roomId}/> : breadcrumbText[link];

  return (
    <div className="breadcrumbs">
      <MuiBreadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => {
          const last = index === breadcrumbs.length - 1;
          link += breadcrumb
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
