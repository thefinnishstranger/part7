import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loginUrl = 'https://bloglistbackend-ffe79c80663f.herokuapp.com/api/login';

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        user: null,
        error: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.error = null;
        },
        clearUser: (state) => {
            state.user = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const { setUser, clearUser, setError, clearError } = authenticationSlice.actions;

export const login = (credentials) => async (dispatch) => {
    try {
        const response = await axios.post(loginUrl, credentials);
        const { token, username, name } = response.data;
        const user = { token, username, name };
        dispatch(setUser(user));
        localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    } catch (error) {
        dispatch(setError('Invalid username or password'));
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("loggedBlogappUser");
    dispatch(clearUser());
};

export default authenticationSlice.reducer;
