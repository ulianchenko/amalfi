import { configureStore } from '@reduxjs/toolkit'
import roomsReducer from './rooms';
import reviewsReducer from './reviews';
import bookingsReducer from './bookings';
import usersReducer from './users';
import likesReducer from './likes';

const store = configureStore({
    reducer: {
        roomsReducer,
        reviewsReducer,
        bookingsReducer,
        usersReducer,
        likesReducer
    }
});

export default store;