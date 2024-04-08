import { createAction, createSlice } from '@reduxjs/toolkit';
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
    },
    bookingRemoved: (state, action) => {
      state.entities = state.entities.filter(booking => booking._id !== action.payload);
      state.error = null;
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
  bookingRemoved,
} = actions;

const removeBookingRequested = createAction('bookings/removeBookingRequested');
const removeBookingRequestedFailed = createAction('bookings/removeBookingRequestedFailed');

export const loadBookingsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().bookingsReducer;
  if (isOutDated(Number(lastFetch))) {
    dispatch(bookingsRequested());
    try {
      const { content } = await bookingService.getAll();
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
      const { content } = await bookingService.create(payload);
      dispatch(bookingCreated(content));
      return content;
    // } catch (errorResponse) {
    } catch (error) {
      if (error.response.status === 500) {
        dispatch(bookingCreateRequestedFailed(error.response.data.message));
        return;
      }
      const { message } = error.response.data.error;
      dispatch(bookingCreateRequestedFailed(message));
      // const { message } = errorResponse;
      // dispatch(bookingCreateRequestedFailed(message));
    }
  };

export const removeBooking =
  (bookingId) =>
  async dispatch => {
    dispatch(removeBookingRequested());
    try {
      console.log('store remove bookingId: ', bookingId);
      const id = await bookingService.remove(bookingId || '');
      dispatch(bookingRemoved(id));
    } catch (error) {
      dispatch(removeBookingRequestedFailed());
    }
  };

// selectors:
export const getBookingCreatedStatus = () => (state) => state.bookingsReducer.createBookingLoading;
export const getBookingsByUserId = (userId) => (state) => {
  if (state.bookingsReducer.entities) {
    return state.bookingsReducer.entities.filter(booking => booking.userId === userId);
  }
  return [];
};

export const getBookingsErrors = () => (state) => state.bookingsReducer.error;

export const getBookingsByRoomId = (roomId) => (state) => {
  if (state.bookingsReducer.entities) {
    return state.bookingsReducer.entities.filter(booking => booking.roomId === roomId);
  }
  return [];
};

export default bookingsReducer;
