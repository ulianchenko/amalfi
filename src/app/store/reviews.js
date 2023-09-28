import { createSlice, createAction } from '@reduxjs/toolkit';
import reviewsService from '../services/reviews.service';

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    entities: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    reviewsRequested: state => {
      state.isLoading = true;
    },
    reviewsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    reviewsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    reviewCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    reviewUpdated: (state, action) => {
      const reviewIndex = state.entities.findIndex(review => review._id === action.payload._id);
      state.entities[reviewIndex] = action.payload;
    },
    reviewRemoved: (state, action) => {
      state.entities = state.entities.filter(review => review._id !== action.payload);
    },
  }
});

const { actions, reducer: reviewsReducer } = reviewsSlice;

const { reviewsRequested, reviewsReceived, reviewsRequestFailed, reviewCreated, reviewUpdated, reviewRemoved } = actions;

const reviewCreateRequested = createAction('reviews/reviewCreateRequested');
const reviewCreateRequestedFailed = createAction('reviews/reviewCreateRequestedFailed');

const reviewUpdateRequested = createAction('reviews/reviewUpdateRequested');
const reviewUpdateRequestedFailed = createAction('reviews/reviewUpdateRequestedFailed');

const reviewRemoveRequested = createAction('reviews/reviewRemoveRequested');
const reviewRemoveRequestedFailed = createAction('reviews/reviewRemoveRequestedFailed');

export const loadReviewsList = () => async dispatch => {
  dispatch(reviewsRequested());
  try {
    const content = await reviewsService.getAll();
    dispatch(reviewsReceived(content || []));
  } catch (error) {
    reviewsRequestFailed(error);
  }
};

export const createReview =
  (payload) =>
  async dispatch => {
    dispatch(reviewCreateRequested());
    try {
      const content = await reviewsService.create(payload);
      dispatch(reviewCreated(content));
    } catch (error) {
      dispatch(reviewCreateRequestedFailed());
    }
  };

export const updateReview =
  (payload) =>
  async dispatch => {
    dispatch(reviewUpdateRequested());
    try {
      const content = await reviewsService.update(payload);
      dispatch(reviewUpdated(content));
    } catch (error) {
      console.log(error);
      dispatch(reviewUpdateRequestedFailed());
    }
  };

export const removeReview =
  (reviewId) =>
  async dispatch => {
    dispatch(reviewRemoveRequested());
    try {
      const id = await reviewsService.remove(reviewId);
      dispatch(reviewRemoved(id));
    } catch (error) {
      dispatch(reviewRemoveRequestedFailed());
    }
  };

// selectors:
export const getReviewsByRoomId = (roomId) => (state) => {
  if (state.reviewsReducer.entities) {
    return state.reviewsReducer.entities.filter((review) => review.roomId === roomId);
  } else {
    return [];
  }
};

export default reviewsReducer;
