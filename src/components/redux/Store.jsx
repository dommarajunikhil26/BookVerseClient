import { configureStore } from "@reduxjs/toolkit";
import booksReducer from './bookSlice';
import reviewsReducer from './reviewSlice';
import authReducer, { checkAuthState } from './authSlice';

const Store = configureStore({
    reducer: {
        books: booksReducer,
        reviews: reviewsReducer,
        auth: authReducer,
    },
});

Store.dispatch(checkAuthState());

export default Store;
