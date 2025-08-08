import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import pregameRoomsReducer from "./pregame-rooms-slice";
import globalChatReducer from "./global-chat-slice"
import friendsReducer from "./friends-slice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        pregame: pregameRoomsReducer,
        globalChat: globalChatReducer,
        friends: friendsReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;