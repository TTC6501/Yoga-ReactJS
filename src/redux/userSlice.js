import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;

        },
        logout: (state, action) => {
            state.user = null;
        },
        updateProfile: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;