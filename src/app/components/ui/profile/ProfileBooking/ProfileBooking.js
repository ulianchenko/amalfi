import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSessionStorageBooking } from '../../../../services/sessionStorage.service';
import { getBookingsByUserId } from '../../../../store/bookings';
import { getCurrentUserId } from '../../../../store/users';
import BookingCard from '../../booking/BookingCard/BookingCard';
import Button from '../../../common/Button'

const ProfileBooking = () => {
  const navigate = useNavigate();
  const currentUserId = useSelector(getCurrentUserId());
  // console.log('currentUser: ', currentUserId);
  const bookings = useSelector(getBookingsByUserId(currentUserId || 'not found'));
  const userBookings = currentUserId ?
    bookings :
    getSessionStorageBooking();
  // console.log('userBookings: ', userBookings);
  const totalPrice = userBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  // console.log('totalPrice: ', totalPrice);
  const handleCheckout = (e) => {
    e.preventDefault();
    navigate('/checkout', {state: { totalPrice }});
  }
  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ marginBottom: '20px' }}>My bookings</h1>
      <div className='booking-list' style={{ width: '100%' }}>
        {/* {bookings.map(booking => (
          <BookingCard key={booking._id} {...booking} />
        ))} */}
        {userBookings.map(booking => (
          <BookingCard key={booking._id} {...booking} />
        ))}
        {/* {bookings.length === 0 && <h3>Bookings list is empty</h3>} */}
        {userBookings.length === 0 && <h3>Bookings list is empty</h3>}
      </div>
      {/* <BookingFormPriceInfo
        roomId={roomId}
        totalPrice={totalPrice}
        countDays={countDays}
        setTotalPrice={setTotalPrice}
      /> */}
      {/* <CheckoutTotalPrice
        bookings={bookings}
        totalPrice={totalPrice}
        countDays={countDays}
        setTotalPrice={setTotalPrice}
      /> */}
      <div className='booking-form__price'>
        <div className='booking-form__price-item'>
          <div className='price-item__totalPrice'>
            <span className='totalPrice__text'>Total (incl. taxes):</span>
            <span className='totalPrice__dots'></span>
            <span className='totalPrice__cell'>{totalPrice}€</span>
          </div>
        </div>
        <Button onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default ProfileBooking;
