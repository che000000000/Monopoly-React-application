import { createSlice, Slice, type PayloadAction } from "@reduxjs/toolkit";
import { type AuthStateT, type LoginUserPayloadT, type RegisterUserPayloadT } from "../types/auth";
import { UserRole } from "./enums/user-role";

const initialState: AuthStateT = {
    isAuth: false,
    user: {
        id: '1',
        name: 'видеокал',
        avatarUrl: 'https://avatars.mds.yandex.net/get-shedevrum/11511289/f64db62ec6d411eebe70aa2339796401/orig',
        role: UserRole.REGULAR
    },
}

const authSlice: Slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser(state) {
            state.isAuth = true
        },
        registerUser(state, action: PayloadAction<RegisterUserPayloadT>) {
        }
    }
})

export const { setAppError, loginUser, registerUser } = authSlice.actions;

export default authSlice.reducer;