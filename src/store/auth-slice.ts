import { createSlice, Slice, type PayloadAction } from "@reduxjs/toolkit";
import { type AuthStateT, type LoginUserPayloadT } from "../types/auth";

const initialState: AuthStateT = {
    isAuth: false,
    user: null,
    oauthUrl: null
}

const authSlice: Slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser(state, action: PayloadAction<LoginUserPayloadT>) {
            state.isAuth = true
            state.user = action.payload
        },
        setOauthUrl(state, action: PayloadAction<string>) {
            state.oauthUrl = action.payload
        }
    }
})

export const { loginUser, setOauthUrl } = authSlice.actions;

export default authSlice.reducer;