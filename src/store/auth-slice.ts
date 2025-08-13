import { createSlice, Slice, type PayloadAction } from "@reduxjs/toolkit";
import { type AuthStateT, type LoginUserPayloadT, type RegisterUserPayloadT } from "../types/auth";
import { UserRole } from "./enums/user-role";

const initialState: AuthStateT = {
    isAuth: false,
    user: null,
}

const authSlice: Slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser(state, action: PayloadAction<LoginUserPayloadT>) {
            state.isAuth = true
            state.user = action.payload
        },
    }
})

export const { setAppError, loginUser, registerUser } = authSlice.actions;

export default authSlice.reducer;