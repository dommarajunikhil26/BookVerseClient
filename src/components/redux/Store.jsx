import { configureStore } from "@reduxjs/toolkit"
import booksReducer from './bookSlice';
import reviewsReducer from './reviewSlice';

const Store = configureStore({
    reducer: {
        books: booksReducer,
        reviews: reviewsReducer
    },
});

export default Store