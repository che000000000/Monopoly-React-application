import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import errorsReducer from "./errors-slice"
import pregameRoomsReducer from "./pregame-rooms-slice";
import globalChatReducer from "./global-chat-slice";
import friendsReducer from "./friends-slice";
import gamesReducer from "./games-slice"
import { authApi } from "../API/authApi";

const store = configureStore({
    reducer: {
        auth: authReducer,
        erors: errorsReducer,
        pregame: pregameRoomsReducer,
        globalChat: globalChatReducer,
        friends: friendsReducer,
        games: gamesReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
})

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;