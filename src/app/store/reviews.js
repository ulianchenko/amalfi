import { createSlice } from '@reduxjs/toolkit';
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
    // reviewCreated: (state, action) => {
    //   state.entities.push(action.payload);
    // },
    // reviewRemoved: (state, action) => {
    //   state.entities = state.entities.filter(review => review._id !== action.payload);
    // },
    // reviewUpdated: (state, action) => {
    //   const reviewIndex = state.entities.findIndex(review => review._id === action.payload._id);
    //   state.entities[reviewIndex] = action.payload;
    // },
  },
});

const { actions, reducer: reviewsReducer } = reviewsSlice;

// const { reviewsRequested, reviewsReceived, reviewsRequestFailed, reviewCreated, reviewRemoved, reviewUpdated } =
//   actions;
const { reviewsRequested, reviewsReceived, reviewsRequestFailed } =
  actions;

export const loadReviewsList = () => async dispatch => {
  dispatch(reviewsRequested());
  try {
    const content = await reviewsService.getAll();
    dispatch(reviewsReceived(content || []));
  } catch (error) {
    reviewsRequestFailed(error);
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