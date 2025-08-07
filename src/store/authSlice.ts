import { createSlice, Slice, type PayloadAction } from "@reduxjs/toolkit";
import { type AuthStateT, type LoginUserPayloadT, type RegisterUserPayloadT } from "../types/auth";

const initialState: AuthStateT = {
    isAuth: false,
    user: {
        id: '',
        name: '',
        avatarUrl: '',
        role: ''
    }
}

const authSlice: Slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser(state, action: PayloadAction<LoginUserPayloadT>) {
            console.log(action.payload)
            state.isAuth = true
        },
        registerUser(state, action: PayloadAction<RegisterUserPayloadT>) {
            console.log(action.payload)
        }
    }
})

export const { loginUser, registerUser } = authSlice.actions

export default authSlice.reducer;