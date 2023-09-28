import React from 'react';
import Rating from '../../common/Rating';

const RoomReviewsCard = ({ countReviews = 0, rate = 0 }) => {
  const ratingValue = +(rate / countReviews).toFixed(2);

  return (
    <div className='room-info__card'>
      <h3 className='room-info__card-title'>Room rating</h3>
      {countReviews > 0 ? (
        <>
          <p className='room-info__card-rating__title'>
            Rating: <span>{ratingValue} out of 5</span>
          </p>
          <Rating value={ratingValue} name='rating' precision={0.1} readOnly size='large' />
        </>
      ) : (
        <>
          <h3>No reviews yet</h3>
        </>
      )}
    </div>
  );
};

export default RoomReviewsCard;
