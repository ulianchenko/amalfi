import { Paper } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeSessionStorageBooking } from '../../../../services/sessionStorage.service';
import { removeBooking } from '../../../../store/bookings';
import { getRoomById, removeBookingRoom } from '../../../../store/rooms';
import { getCurrentUserId } from '../../../../store/users';
import { getDateDDMMYYYY } from '../../../../utils/formatDate';
import Button from '../../../common/Button';
import { getGuestsLabel } from '../../GuestsCounter/GuestsCounter';
import RoomCard from '../../rooms/RoomCard';

const BookingCard = ({
  _id,
  arrivalDate,
  departureDate,
  adults,
  children,
  babies,
  totalPrice,
  roomId,
}) => {
  const dispatch = useDispatch();
  const room = useSelector(getRoomById(roomId));
  const currentUserId = useSelector(getCurrentUserId());

  const handleRemoveBooking = () => {
    dispatch(removeBooking(_id));
    dispatch(removeBookingRoom({ roomId, _id: _id || '' }));
    if (!currentUserId) {
      removeSessionStorageBooking(_id);
    }
  };

  return (
    <Paper className='booking-card'>
      <div className='booking-card__wrapper'>
        <div className='booking-content'>
          <h2>
            # <span>{_id}</span>
          </h2>
          <h3 className='booking-info__title'>Booking info</h3>
          <table className='booking-info'>
            <tbody className='booking-info__body'>
              <tr className='booking-info__item'>
                <td>Arrival date:</td>
                <td>
                  <span>{`${getDateDDMMYYYY(arrivalDate)}`}</span>
                </td>
              </tr>
              <tr className='booking-info__item'>
                <td>Departure date:</td>
                <td>
                  <span>{`${getDateDDMMYYYY(departureDate)}`}</span>
                </td>
              </tr>
              <tr className='booking-info__item'>
                <td>Cuests:</td>
                <td>
                  <span>{getGuestsLabel(adults, children, babies)}</span>
                </td>
              </tr>
              <tr className='booking-info__item'>
                <td>Price:</td>
                <td>
                  <span>{`${totalPrice}`}&#x20AC;</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='booking-card__btns'>
          <div style={{ width: '100%' }}>
            <RoomCard
              _id={room?._id || 'id not found'}
              roomNumber={room?.roomNumber || 'not found'}
              price={room?.price || 0}
              type={room?.type}
              images={room?.images}
              comforts={room?.comforts}
            />
          </div>
          <Link to={`/rooms/${roomId}`}>
            <Button size='small' fullWidth>
              Go to room page
            </Button>
          </Link>
          <Button size='small' variant='outlined' color='error' onClick={handleRemoveBooking}>
            Cancel booking
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default BookingCard;
