import { createSlice, Slice, type PayloadAction } from "@reduxjs/toolkit";
import { type AuthStateT, type LoginUserPayloadT } from "../types/auth";

const initialState: AuthStateT = {
    isAuth: false,
    user: null,
    isAuthLoading: true,
    oauthUrl: null
}

const authSlice: Slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthLoading(state, action: PayloadAction<boolean>) {
            state.isAuthLoading = action.payload
        },
        loginUser(state, action: PayloadAction<LoginUserPayloadT>) {
            state.isAuth = true
            state.user = action.payload
            state.isAuthLoading = false
        },
        setOauthUrl(state, action: PayloadAction<string>) {
            state.oauthUrl = action.payload
        }
    }
})

export const { setIsAuthLoading,  loginUser, setOauthUrl } = authSlice.actions;

export default authSlice.reducer;