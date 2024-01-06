import { createAction, createSlice } from '@reduxjs/toolkit';
import likesService from '../services/likes.service';

const initialState = {
  entities: [],
  isLoading: true,
  error: null
};

const likesSlice = createSlice({
  name: 'likes',
  initialState: initialState,
  reducers: {
    likesRequested: state => {
      state.isLoading = true;
    },
    likesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    likesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    likeCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    likeRemoved: (state, action) => {
      state.entities = state.entities.filter(like => like._id !== action.payload);
    },
  },
});

const { actions, reducer: likesReducer } = likesSlice;

const { likesRequested, likesReceived, likesRequestFailed, likeCreated, likeRemoved } = actions;

const likeCreateRequested = createAction('likes/likeCreateRequested');
const likeCreateRequestedFailed = createAction('likes/likeCreateRequestedFailed');

const likeRemoveRequested = createAction('likes/likeRemoveRequested');
const likeRemoveRequestedFailed = createAction('likes/likeRemoveRequestedFailed');

export const loadLikesList = () => async (dispatch, getState) => {
  dispatch(likesRequested());
  try {
    const { content } = await likesService.getAll();
    dispatch(likesReceived(content));
  } catch (error) {
    dispatch(likesRequestFailed(error.message));
  }
};

export const createLike =
  (payload) =>
  async dispatch => {
    dispatch(likeCreateRequested());
    try {
      const { content } = await likesService.create(payload);
      dispatch(likeCreated(content || []));
    } catch (error) {
      dispatch(likeCreateRequestedFailed());
    }
  };

export const removeLike =
  (payload) =>
  async (dispatch, getState) => {
    dispatch(likeRemoveRequested());
    try {
      const { entities } = getState().likes;
      const userLikes = entities.filter((like) => like.userId === payload.userId);
      const currentLike = userLikes.find((like) => like.reviewId === payload.reviewId);
      if (currentLike) {
        const likeId = await likesService.remove(currentLike._id);
        dispatch(likeRemoved(likeId));
      }
    } catch (error) {
      dispatch(likeRemoveRequestedFailed());
    }
  };


  // selectors:
export const getLikesByReviewId = (reviewId) => (state) => {
  if (state.likesReducer.entities) {
    return state.likesReducer.entities.filter(like => like.reviewId === reviewId);
  }
  return [];
};

export const getLikesByUserId = (userId) => (state) => {
  if (state.likesReducer.entities) {
    return state.likesReducer.entities.filter(like => like.userId === userId);
  }
  return [];
};

export default likesReducer;
