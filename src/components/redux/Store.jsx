import { configureStore } from "@reduxjs/toolkit"
import booksReducer from './bookSlice';

const Store = configureStore({
    reducer: {
        books: booksReducer,
    },
});

export default Store