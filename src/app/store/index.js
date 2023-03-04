import { configureStore } from '@reduxjs/toolkit'
import roomsReducer from './rooms';

const store = configureStore({
    reducer: {
        roomsReducer,
    }
});

export default store;