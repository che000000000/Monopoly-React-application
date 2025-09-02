import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/auth-slice";
import errorsReducer from "./errors-slice"
import pregameRoomsReducer from "./slices/pregame-rooms/pregame-rooms-slice";
import globalChatReducer from "./global-chat-slice";
import friendsReducer from "./friends-slice";
import gamesReducer from "./slices/games/games-slice"
import { authApi } from "../API/rtk/authApi";

const store = configureStore({
    reducer: {
        auth: authReducer,
        erors: errorsReducer,
        pregameRooms: pregameRoomsReducer,
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

export type AppThunkApi = {
    dispatch: AppDispatch;
    state: RootState;
    extra?: unknown;
    rejectValue?: unknown;
};