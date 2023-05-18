import { configureStore } from '@reduxjs/toolkit'
import roomsReducer from './rooms';
import reviewsReducer from './reviews';

const store = configureStore({
    reducer: {
        roomsReducer,
        reviewsReducer,
    }
});

export default store;