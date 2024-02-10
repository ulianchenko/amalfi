import { ArrowRight } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Form, useForm, useModal } from '../../../../hooks';
import { getSearchQueryData } from '../../../../services/sessionStorage.service';
import { createBooking, getBookingCreatedStatus, getBookingsErrors } from '../../../../store/bookings';
import { addBookingRoom } from '../../../../store/rooms';
import { getCurrentUserId } from '../../../../store/users';
import Button from '../../../common/Button';
import { DateOfStayField } from '../../../common/Fields';
import GuestsCounter from '../../GuestsCounter';
import { SuccessBookingModal } from '../../modals';
import BookingFormPriceInfo from './BookingFormPriceInfo';
import validatorConfig from './validatorConfig';

const oneDayMs = 86400000;

const BookingForm = () => {
  const searchQueryData = getSearchQueryData();
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);
  const { roomId } = useParams();
  const currentUserId = useSelector(getCurrentUserId());
  const bookingCreateStatusLoading = useSelector(getBookingCreatedStatus());
  const bookingError = useSelector(getBookingsErrors());
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  const initialData = {
    arrivalDate: searchQueryData?.arrivalDate || Date.now(),
    departureDate: searchQueryData?.departureDate || Date.now() + oneDayMs,
    adults: searchQueryData?.adults || 1,
    children: searchQueryData?.children || 0,
    babies: searchQueryData?.babies || 0,
    userId: currentUserId || 'not found',
    roomId: roomId,
    totalPrice: 0,
  };
  const { data, errors, enterError, setEnterError, handleInputChange, handleResetForm, handleKeyDown, validate } =
    useForm(initialData, false, validatorConfig);

  const countDays = Math.max(1, Math.round((data.departureDate - data.arrivalDate) / oneDayMs));

  useEffect(() => {
    // if (!currentUserId) {
    //   setEnterError('Sign in to book a room');
    // }
    if (bookingError) {
      if (bookingError === 'BOOKING_EXIST') {
        setEnterError('The room is booked for the dates you have chosen');
      }
      if (bookingError === 'An error has occurred on the server. Please, try again later') {
        setEnterError('Oops, something went wrong, please try again later');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId, bookingError]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate(data)) {
      const payload = {
        ...data,
        totalPrice,
      };
      try {
        dispatch(createBooking(payload)).then((bookingData) => {
          if (bookingData) {
            dispatch(addBookingRoom(bookingData)).then(() => handleOpenModal());
            handleResetForm(event);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown}>
        <DateOfStayField onChange={handleInputChange} data={data} />
        <GuestsCounter onChange={handleInputChange} data={data} />
        <BookingFormPriceInfo
          roomId={roomId}
          totalPrice={totalPrice}
          countDays={countDays}
          setTotalPrice={setTotalPrice}
        />
        <Button
          endIcon={<ArrowRight />}
          type='submit'
          className='form-btn__submit mt-0'
          onClick={handleSubmit}
          disabled={Object.keys(errors).length > 0 || !!enterError}
          fullWidth
        >
          Reserve
        </Button>
      </Form>
      {enterError && <p className='form__enter-error'>{enterError}</p>}
      <SuccessBookingModal
        open={isOpen}
        onClose={handleCloseModal}
        isLoading={bookingCreateStatusLoading}
        bookingData={data}
      />
    </>
  );
};

export default BookingForm;
