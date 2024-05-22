import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    reviews: [],
    isLoading: false,
    error: null,
    totalItems: 0
};

export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (_, { rejectWithValue }) => {
        try {
            const url = `${import.meta.env.VITE_SERVER_REVIEW_URL}`;
            const response = await axios.get(url);
            if (response.data._embedded && response.data._embedded.reviews) {
                return {
                    reviews: response.data._embedded.reviews,
                    totalItems: response.data.page.totalElements
                };
            } else {
                throw new Error("Reviews data is not available in the response");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.reviews = action.payload.reviews;
                state.totalItems = action.payload.totalItems;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default reviewSlice.reducer;
