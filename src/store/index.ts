import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import pregameRoomsReducer from "./pregameRoomsSlice";
import globalChatReducer from "./globalChatSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        pregame: pregameRoomsReducer,
        globalChat: globalChatReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;