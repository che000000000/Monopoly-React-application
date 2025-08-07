import { createSlice, Slice, type PayloadAction } from "@reduxjs/toolkit";
import { type AuthStateT, type LoginUserPayloadT, type RegisterUserPayloadT } from "../types/auth";
import { UserRole } from "./enums/user-role";

const initialState: AuthStateT = {
    isAuth: false,
    user: {
        id: '1',
        name: 'видеокал',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkEfGn7ner5O1tTQAk9HBUhT_z8phEhvGtrQ&s',
        role: UserRole.REGULAR
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