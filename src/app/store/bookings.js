import { createSlice } from '@reduxjs/toolkit';
import bookingService from '../services/booking.service';
import isOutDated from '../utils/isOutDated';

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    entities: [],
    isLoading: true,
    createBookingLoading: false,
    error: null,
    lastFetch: null,
  },
  reducers: {
    bookingsRequested: state => {
      state.isLoading = true;
    },
    bookingsReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    bookingsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    bookingCreateRequested: state => {
      state.error = null;
      state.createBookingLoading = true;
    },
    bookingCreateRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.createBookingLoading = false;
    },
    bookingCreated: (state, action) => {
      state.entities.push(action.payload);
      state.error = null;
      state.createBookingLoading = false;
    }
  },
});

const { actions, reducer: bookingsReducer } = bookingsSlice;

const {
  bookingsRequested,
  bookingsReceived,
  bookingsRequestFailed,
  bookingCreated,
  bookingCreateRequested,
  bookingCreateRequestedFailed,
} = actions;

export const loadBookingsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().bookingsReducer;
  if (isOutDated(Number(lastFetch))) {
    dispatch(bookingsRequested());
    try {
      const content = await bookingService.getAll();
      dispatch(bookingsReceived(content || []));
    } catch (error) {
      dispatch(bookingsRequestFailed(error.message));
    }
  }
};

export const createBooking =
  (payload) =>
  async dispatch => {
    dispatch(bookingCreateRequested());
    try {
      const content = await bookingService.create(payload);
      dispatch(bookingCreated(content));
      return content;
    } catch (error) {
      if (error.response.status === 500) {
        dispatch(bookingCreateRequestedFailed(error.response.data.message));
        return;
      }
      const { message } = error.response.data.error;
      dispatch(bookingCreateRequestedFailed(message));
    }
  };

// selectors:
export const getBookingCreatedStatus = () => (state) => state.bookingsReducer.createBookingLoading;

export const getBookingsErrors = () => (state) => state.bookingsReducer.error;

export default bookingsReducer;
