import { configureStore } from "@reduxjs/toolkit"
import booksReducer from './bookSlice';
import reviewsReducer from './reviewSlice';
import authReducer from './authSlice';

const Store = configureStore({
    reducer: {
        books: booksReducer,
        reviews: reviewsReducer,
        auth: authReducer,
    },
});

export default Store