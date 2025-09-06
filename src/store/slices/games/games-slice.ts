import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GamesStateT } from "./types/games-state";
import { IGameChatMessage } from "./interfaces/game-chat-message";
import { IGameState } from "./interfaces/game-state";
import { IGamePreview } from "./interfaces/game-preview";

const initialState: GamesStateT = {
    isGatewayConnected: false,
    startGameFlag: false,
    games: {
        games: [],
        totalCount: 0
    },
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
        setStartGameFlag(state: GamesStateT, action: PayloadAction<boolean>) {
            state.startGameFlag = action.payload
        },
        setCurrentGame(state: GamesStateT, action: PayloadAction<IGameState>) {
            state.currentGame = action.payload
        },
        pushGameChatMessagesPage(state: GamesStateT, action: PayloadAction<{messagesList: IGameChatMessage[], totalCount: number}>) {
            action.payload.messagesList.forEach((message: IGameChatMessage) => state.currentGameChat.messages.push(message))
            state.currentGameChat.totlaCount = action.payload.totalCount
        },
        pushGameChatMessage(state: GamesStateT, action: PayloadAction<IGameChatMessage>) {
            state.currentGameChat.messages.push(action.payload)
            state.currentGameChat.totlaCount++
        },
        clearGameChatMessages(state: GamesStateT, action: PayloadAction<void>) {
            state.currentGameChat.messages = []
            state.currentGameChat.totlaCount = 0
        },
        pushGamesPage(state: GamesStateT, action: PayloadAction<{gamePreviewsList: IGamePreview[], totalCount: number}>) {
            action.payload.gamePreviewsList.forEach((gamePreview: IGamePreview) => {
                state.games.games.push(gamePreview)
                state.games.totalCount = action.payload.totalCount
            })
        },
        pushGame(state: GamesStateT, action: PayloadAction<IGamePreview>) {
            state.games.games.push(action.payload)
        },
        clearGames(state: GamesStateT, action: PayloadAction<void>) {
            state.games.games = []
            state.games.totalCount = 0
        }
    }
})

export const { 
    setIsGatewayConnected, setStartGameFlag, setCurrentGame, 
    pushGameChatMessagesPage, pushGameChatMessage, clearGameChatMessages, 
    pushGamesPage, pushGame, clearGames } = gamesSlice.actions;

export default gamesSlice.reducer;