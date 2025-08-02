import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
    },
    reducers: {
        // login(state, action) {
            
        // },
        // register(state,action) {
            
        // },
        toggleIsAuth(state, action) {
            state.isAuth = action.payload
        }
    }
})

export const {} = authSlice.actions

export default authSlice.reducer;