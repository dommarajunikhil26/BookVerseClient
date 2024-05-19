import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    books: [],
    isLoading: false,
    error: null,
    totalItems: 0,
};

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async ({ page, size } = {}, { rejectWithValue }) => {
        try {
            let url = `${import.meta.env.VITE_BASE_SERVER_URL}`;
            if (page !== undefined && size !== undefined) {
                url += `?page=${page}&size=${size}`;
            }
            const response = await axios.get(url);
            if (response.data._embedded && response.data._embedded.books) {
                return {
                    books: response.data._embedded.books,
                    totalItems: response.data.page.totalElements // Extract total items count
                };
            } else {
                throw new Error("Books data is not available in the response");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchBooksByCategory = createAsyncThunk(
    'books/fetchBooksByCategory',
    async ({ page, size, category } = {}, { rejectWithValue }) => {
        try {
            let url = `${import.meta.env.VITE_BASE_SERVER_URL}?category=${category}`;
            if (page !== undefined && size !== undefined) {
                url += `&page=${page}&size=${size}`;
            }
            const response = await axios.get(url);
            if (response.data._embedded && response.data._embedded.books) {
                return {
                    books: response.data._embedded.books,
                    totalItems: response.data.page.totalElements // Extract total items count
                };
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
                state.books = action.payload.books;
                state.totalItems = action.payload.totalItems;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchBooksByCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBooksByCategory.fulfilled, (state, action) => {
                state.books = action.payload.books;
                state.totalItems = action.payload.totalItems;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchBooksByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default booksSlice.reducer;
