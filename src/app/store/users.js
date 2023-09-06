import { createSlice } from '@reduxjs/toolkit';
import localStorageService from '../services/localStorage.service';
import userService from '../services/user.service';


const initialState = localStorageService.getAccessToken()
  ? {
      entities: [],
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: [],
      isLoading: false,
      error: null,
      auth: { userId: null },
      isLoggedIn: false,
      dataLoaded: false,
    };

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    usersRequested: state => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: usersReducer } = usersSlice;

const {
  usersRequested,
  usersReceived,
  usersRequestFailed
} = actions;

export const loadUsersList = () => async (dispatch, getState) => {
  dispatch(usersRequested());
  try {
    const content = await userService.getAll();
    dispatch(usersReceived(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

// selectors:
export const getUsersLoadingStatus = () => (state) => state.usersReducer.isLoading;
export const getIsLoggedIn = () => (state) => state.usersReducer.isLoggedIn;
export const getCurrentUserId = () => (state) => {
  return state.usersReducer.auth.userId;
};

export default usersReducer;
