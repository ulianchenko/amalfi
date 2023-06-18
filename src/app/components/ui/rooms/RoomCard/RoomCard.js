import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ComputerIcon from '@mui/icons-material/Computer';
import WifiIcon from '@mui/icons-material/Wifi';
import Divider from '@mui/material/Divider';
import { getReviewsByRoomId } from '../../../../store/reviews';
import declOfNum from '../../../../utils/declOfNum';
import ImageSlider from '../../../common/ImageSlider';
import Rating from '../../../common/Rating';
import Badge from '../../../common/Badge';

const comfortIconsMap = {
  hasWifi: <WifiIcon />,
  hasConditioner: <AcUnitIcon />,
  hasWorkSpace: <ComputerIcon />,
};

const RoomCard = ({ _id, roomNumber, price, type, images, comforts }) => {
  const reviews = useSelector(getReviewsByRoomId(_id));
  const countReviews = reviews ? reviews.length : 0;
  const rating = countReviews > 0 ? reviews.reduce((acc, cur) => acc + cur.rating, 0) : 0;

  return (
    <div className='room-card'>
      {comforts && (
        <Badge className='badge'>
          {comforts.map(comfort => (
            <div key={comfort}>{comfortIconsMap[comfort]}</div>
          ))}
        </Badge>
      )}
      <ImageSlider className='room-card__gallery'>
        {images &&
          images.map(img => (
            <div className='room-card__gallery-item' key={img}>
              <img className='room-card__gallery-item--img' src={img} alt='roomsPhoto' />
            </div>
          ))}
      </ImageSlider>
      <Link to={`/rooms/${_id}`} className='room-card__description'>
        <div className='room-card__description-row'>
          <h3 className='room-card__title'>
            № <span className='room-card__title--big'>{roomNumber}</span>
            {type === 'Suite' && <span className='room-card__type'>{type}</span>}
          </h3>
          <div className='room-card__rentPerDay'>
            <span>{price}&#8364;</span> per night
          </div>
        </div>
        <Divider />
        <div className='room-card__description-row'>
          <div className='room-card__rating'>
            <Rating name='read-only' value={rating} totalCount={countReviews} readOnly />
          </div>
          <div className='room-card__reviews'>
            <span className='room-card__reviews-count'>{`${countReviews} ${declOfNum(countReviews, [
              'Feedback',
              'Feedbacks',
            ])}`}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
