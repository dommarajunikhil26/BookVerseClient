// bookSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    books: [],
    isLoading: false,
    error: null,
};

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_SERVER_URL}?page=0&size=9`);
            if (response.data._embedded && response.data._embedded.books) {
                return response.data._embedded.books;
            } else {
                throw new Error("Books data is not available in the response");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.books = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default booksSlice.reducer;
