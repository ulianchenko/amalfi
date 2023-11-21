import { createAction, createSlice } from '@reduxjs/toolkit';
import localStorageService, { setTokens } from '../services/localStorage.service';
import generateAuthError from '../utils/generateAuthError';
import userService from '../services/user.service';
import authService from '../services/auth.service';


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
    },
    authRequested: state => {
      state.error = null;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userUpdated: (state, action) => {
      const userIndex = state.entities.findIndex(user => user._id === action.payload._id);
      state.entities[userIndex] = action.payload;
    },
    userLoggedOut: state => {
      state.isLoggedIn = false;
      state.auth.userId = null;
    }
  }
});

const { actions, reducer: usersReducer } = usersSlice;

const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequested,
  authRequestSuccess,
  authRequestFailed,
  userUpdated,
  userLoggedOut
} = actions;

const userUpdateRequested = createAction('users/userUpdateRequested');
const userUpdateRequestedFailed = createAction('users/userUpdateRequestedFailed');

export const updateUserData =
  (payload) =>
  async dispatch => {
    dispatch(userUpdateRequested());
    try {
      const content = await userService.updateUserData(payload);
      dispatch(userUpdated(content));
    } catch (error) {
      dispatch(userUpdateRequestedFailed());
    }
  };

// export const signIn = ({ payload, redirect }, navigate) => async dispatch => {
export const signIn = (payload) => async dispatch => {
  const { email, password } = payload;
  dispatch(authRequested());
  try {
    const data = await authService.signIn({ email, password });

    setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    // navigate(redirect || '/');
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

// export const signUp = (payload, navigate) => async dispatch => {
export const signUp = (payload) => async dispatch => {
  dispatch(authRequested());
  try {
    const data = await authService.signUp(payload);
    setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    // navigate('/');
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

// export const logOut = (navigate) => async dispatch => {
export const logOut = () => async dispatch => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  // navigate('/');
};

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
export const getCurrentUserData = () => (state) => {
  if (state.usersReducer.auth) {
    return state.usersReducer.entities
      ? state.usersReducer.entities.find((user) => user._id === state.usersReducer.auth.userId)
      : null;
  }
};
export const getUsersLoadingStatus = () => (state) => state.usersReducer.isLoading;
export const getUserById = (userId) => (state) => {
  if (state.usersReducer.entities) {
    return state.usersReducer.entities.find((user) => user._id === userId);
  }
};
export const getIsLoggedIn = () => (state) => state.usersReducer.isLoggedIn;
export const getCurrentUserId = () => (state) => {
  return state.usersReducer.auth.userId;
};
export const getAuthErrors = () => (state) => state.usersReducer.error;

export default usersReducer;
