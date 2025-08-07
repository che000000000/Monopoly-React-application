import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import pregameRoomsSlice from "./pregameRoomsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        pregame: pregameRoomsSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;