import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GamesStateT } from "./types/games-state";
import { IGameChatMessage } from "./interfaces/game-chat-message";
import { IGameState } from "./interfaces/game-state";
import { IGamePreview } from "./interfaces/game-preview";
import { IGameField } from "./interfaces/game-field";
import { IGameTurn } from "./interfaces/game-turn";
import { IPlayer } from "./interfaces/player";

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
        pushGameChatMessagesPage(state: GamesStateT, action: PayloadAction<{ messagesList: IGameChatMessage[], totalCount: number }>) {
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
        pushGamesPage(state: GamesStateT, action: PayloadAction<{ gamePreviewsList: IGamePreview[], totalCount: number }>) {
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
        },
        updateGameField(state: GamesStateT, action: PayloadAction<IGameField>) {
            if (!state.currentGame) return

            const index = state.currentGame.fields.findIndex(
                (gameField: IGameField) => gameField.id === action.payload.id
            )

            if (index !== -1) {
                state.currentGame.fields[index] = action.payload;
            }
        },
        setGameTurn(state: GamesStateT, action: PayloadAction<IGameTurn>) {
            if (!state.currentGame) return

            state.currentGame.turn = action.payload
        },
        setDices(state: GamesStateT, action: PayloadAction<number[]>) {
            if (!state.currentGame) return

            state.currentGame.dices = action.payload
        },
        updatePlayer(state: GamesStateT, action: PayloadAction<IPlayer>) {
            if (!state.currentGame) return

            const index = state.currentGame.players.findIndex((palyer: IPlayer) => palyer.id === action.payload.id)
            if (index === -1) return

            state.currentGame.players[index] = action.payload
        }
    }
})

export const {
    setIsGatewayConnected, setStartGameFlag, setCurrentGame,
    pushGameChatMessagesPage, pushGameChatMessage, clearGameChatMessages,
    pushGamesPage, pushGame, clearGames, updateGameField, setGameTurn,
    setDices, updatePlayer } = gamesSlice.actions;

export default gamesSlice.reducer;