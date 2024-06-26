import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DialogContent, DialogActions } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getDateDDMMYYYY } from '../../../../utils/formatDate';
import Button from '../../../common/Button';
import Modal from '../../../common/Modal';
import { getCurrentUserId } from '../../../../store/users';

const SuccessBookingModal = ({ open, onClose, isLoading, bookingData }) => {
  const currentUserId = useSelector(getCurrentUserId());
  const dateArrival = getDateDDMMYYYY(bookingData.arrivalDate);
  const dateDeparture = getDateDDMMYYYY(bookingData.departureDate);

  const navigate = useNavigate();

  const handleGoBack = () => {
    // navigate('/rooms');
    // navigate({pathname: '/rooms', search: ''});
    navigate(-1);
  };

  const handleGoMyBooking = () => {
    const userId = currentUserId || 'unauthorized';
    // navigate(`/profile/${currentUserId}/booking`);
    navigate(`/profile/${userId}/booking`);
  };

  return (
    <Modal title='Room booking' open={open} onClose={onClose} isLoading={isLoading}>
      <DialogContent>
        <div className='booking-modal__text'>
          <h2>Room successfully booked</h2>
          <CheckCircleIcon className='booking-modal__text-icon' />
        </div>
        <table className='booking-modal__info'>
          <tbody>
            <tr>
              <td className='booking-modal__info-dateText'>Arrival date:</td>
              <td className='booking-modal__info-date'>{dateArrival}</td>
            </tr>
            <tr>
              <td className='booking-modal__info-dateText'>Departure date:</td>
              <td className='booking-modal__info-date'>{dateDeparture}</td>
            </tr>
          </tbody>
        </table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleGoBack}>Go back</Button>
        {/* {
          currentUserId ? (

          <Button onClick={handleGoMyBooking} variant='outlined'>
            My bookings
          </Button>
          ):(
            <></>
          )
        } */}
        <Button onClick={handleGoMyBooking} variant='outlined'>
          My bookings
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default React.memo(SuccessBookingModal);
