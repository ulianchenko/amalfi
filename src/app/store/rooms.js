import { createAction, createSlice } from '@reduxjs/toolkit';
import roomsService from '../services/rooms.service';

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    entities: [],
    filteredEntities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    roomsRequested: state => {
      state.isLoading = true;
    },
    roomsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    filteredRoomsReceived: (state, action) => {
      state.filteredEntities = action.payload;
      state.isLoading = false;
    },
    roomsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    roomUpdated: (state, action) => {
      const roomIndex = state.entities.findIndex(room => room._id === action.payload._id);
      state.entities[roomIndex] = action.payload;
    },
  },
});

const { actions, reducer: roomsReducer } = roomsSlice;

const { roomsRequested, roomsReceived, roomsRequestFailed, filteredRoomsReceived, roomUpdated } = actions;

const addBookingRoomRequested = createAction('rooms/addBookingRoomRequested');
const addBookingRoomRequestedSuccess = createAction('rooms/addBookingRoomRequestedSuccess');
const addBookingRoomRequestedFailed = createAction('rooms/addBookingRoomRequestedFailed');

const roomUpdateRequested = createAction('rooms/roomUpdateRequested');
const roomUpdateRequestedFailed = createAction('rooms/roomUpdateRequestedFailed');

const removeBookingRoomRequested = createAction('rooms/removeBookingRoomRequested');
const removeBookingRoomRequestedSuccess = createAction('rooms/removeBookingRoomRequestedSuccess');
const removeBookingRoomRequestedFailed = createAction('rooms/removeBookingRoomRequestedFailed');

export const loadRoomsList = () => async dispatch => {
  dispatch(roomsRequested());
  try {
    const { content } = await roomsService.getAll();
    dispatch(roomsReceived(content || []));
  } catch (error) {
    dispatch(roomsRequestFailed(error.message));
  }
};

export const loadFilteredRoomsList = (queryParams) => async dispatch => {
  dispatch(roomsRequested());
  try {
    console.log('queryParams: ', queryParams);
    const { content } = await roomsService.getAll(queryParams);
    dispatch(filteredRoomsReceived(content || []));
  } catch (error) {
    dispatch(roomsRequestFailed(error.message));
  }
};

export const updateRoomData =
  (payload) =>
  async dispatch => {
    dispatch(roomUpdateRequested());
    try {
      const { content } = await roomsService.update(payload);
      dispatch(roomUpdated(content));
    } catch (error) {
      // console.log(error);
      dispatch(roomUpdateRequestedFailed());
    }
  };

export const addBookingRoom =
  (payload) =>
  async dispatch => {
    dispatch(addBookingRoomRequested());
    try {
      roomsService.setBooking(payload);
      dispatch(addBookingRoomRequestedSuccess());
    } catch (error) {
      dispatch(addBookingRoomRequestedFailed());
    }
  };
export const removeBookingRoom =
  (payload) =>
  async dispatch => {
    dispatch(removeBookingRoomRequested());
    try {
      roomsService.deleteBooking(payload);
      dispatch(removeBookingRoomRequestedSuccess());
    } catch (error) {
      dispatch(removeBookingRoomRequestedFailed());
    }
  };

// selectors:
export const getRooms = () => state => state.roomsReducer.entities;
export const getFilteredRooms = () => state => state.roomsReducer.filteredEntities;
export const getRoomsLoadingStatus = () => state => state.roomsReducer.isLoading;
export const getRoomById = (roomId) => (state) => {
  if (state.roomsReducer.entities) {
    return state.roomsReducer.entities.find(room => room._id === roomId);
  }
};
export const getRoomsByIds = (roomsIds) => (state) => {
  if (state.roomsReducer.entities) {
    return state.roomsReducer.entities.filter(room => (roomsIds.length > 0 ? roomsIds.includes(room._id || '') : false));
  }
  return [];
};

export default roomsReducer;