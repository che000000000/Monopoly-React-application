import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GamesStateT } from "./types/games-state";
import { IGameChatMessage } from "./interfaces/game-chat-message";
import { IGameState } from "./interfaces/game-state";

const initialState: GamesStateT = {
    isGatewayConnected: false,
    games: [],
    currentGame: null,
    currentGameChat: {
        messages: [],
        totlaCount: 0
    }
}

const gamesSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setIsGatewayConnected(start: GamesStateT, action: PayloadAction<boolean>) {
            start.isGatewayConnected = action.payload
        },
        setCurrentGame(state: GamesStateT, action: PayloadAction<IGameState>) {
            state.currentGame = action.payload
        },
        pushGameChatMessagesPage(state: GamesStateT, action: PayloadAction<{messagesList: IGameChatMessage[], totalCount: number}>) {
            action.payload.messagesList.forEach((message: IGameChatMessage) => state.currentGameChat.messages.push(message))
            state.currentGameChat.totlaCount = action.payload.totalCount
        },
        pushGameChatMessage(state, action: PayloadAction<IGameChatMessage>) {
            state.currentGameChat.messages.push(action.payload)
            state.currentGameChat.totlaCount++
        }
    }
})

export const { setIsGatewayConnected, setCurrentGame, pushGameChatMessagesPage, pushGameChatMessage } = gamesSlice.actions;

export default gamesSlice.reducer;