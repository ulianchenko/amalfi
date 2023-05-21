import { createSlice } from '@reduxjs/toolkit';
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
  },
});

const { actions, reducer: roomsReducer } = roomsSlice;

const { roomsRequested, roomsReceived, roomsRequestFailed, filteredRoomsReceived } = actions;

export const loadRoomsList = () => async dispatch => {
  dispatch(roomsRequested());
  try {
    const content = await roomsService.getAll();
    dispatch(roomsReceived(content || []));
  } catch (error) {
    dispatch(roomsRequestFailed(error.message));
  }
};

export const loadFilteredRoomsList = (queryParams) => async dispatch => {
    dispatch(roomsRequested());
    try {
      const content = await roomsService.getAll(queryParams);
      dispatch(filteredRoomsReceived(content || []));
    } catch (error) {
      dispatch(roomsRequestFailed(error.message));
    }
  };

// selectors:
export const getRooms = state => state.roomsReducer.entities;
export const getFilteredRooms = state => state.roomsReducer.filteredEntities;
export const getRoomsLoadingStatus = state => state.roomsReducer.isLoading;
export const getRoomById = (roomId) => (state) => {
  if (state.roomsReducer.entities) {
    return state.roomsReducer.entities.find(room => room._id === roomId);
  }
};

export default roomsReducer;