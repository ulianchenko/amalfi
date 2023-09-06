import { configureStore } from '@reduxjs/toolkit'
import roomsReducer from './rooms';
import reviewsReducer from './reviews';
import bookingsReducer from './bookings';
import usersReducer from './users';

const store = configureStore({
    reducer: {
        roomsReducer,
        reviewsReducer,
        bookingsReducer,
        usersReducer,
    }
});

export default store;