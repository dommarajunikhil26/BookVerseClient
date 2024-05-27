import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updatePassword, onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { auth } from "../firebase/Firebase";

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

const extractUserInfo = (user) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    claims: user.claims
});

// Thunks
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const tokenResult = await getIdTokenResult(user);
            const userInfo = extractUserInfo({ ...user, claims: tokenResult.claims });
            return userInfo;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
            return true;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const tokenResult = await getIdTokenResult(user);
            const userInfo = extractUserInfo({ ...user, claims: tokenResult.claims });
            return userInfo;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (newPassword, { rejectWithValue }) => {
        try {
            const user = auth.currentUser;
            if (user) {
                await updatePassword(user, newPassword);
                return true;
            } else {
                throw new Error("User is not authenticated");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const checkAuthState = createAsyncThunk(
    'auth/checkAuthState',
    async (_, { dispatch }) => {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const tokenResult = await getIdTokenResult(user);
                    const userInfo = extractUserInfo({ ...user, claims: tokenResult.claims });
                    dispatch(setUser(userInfo));
                    resolve(userInfo);
                } else {
                    dispatch(clearUser());
                    resolve(null);
                }
            });
        });
    }
);

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        clearUser(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(checkAuthState.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuthState.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            });
    },
});

export const { setUser, clearUser, setError } = authSlice.actions;
export default authSlice.reducer;
