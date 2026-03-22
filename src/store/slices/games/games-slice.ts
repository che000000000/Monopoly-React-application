import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GamesStateT } from "./types/games-state";
import { IGameChatMessage } from "../../interfaces/game-chat-message";
import { IGameState } from "../../interfaces/game-state";
import { IGameField } from "../../interfaces/game-field";
import { GameTurnStage, IGameTurn } from "../../interfaces/game-turn";
import { IGamePreview } from "../../interfaces/game-preview";
import { IPlayer, PlayerChip } from "../../interfaces/player";
import { UserRole } from "../../interfaces/user";

const initialState: GamesStateT = {
    isGatewayConnected: false,
    startingGameFlag: false,
    isCurrentGameActive: false,
    games: {
        games: [],
        totalCount: 0
    },
    currentGame: {
        id: '',
        players: [],
        fields: [],
        turn: {
            id: '',
            player: {
                id: '',
                user: {
                    id: '',
                    name: '',
                    avatarUrl: '',
                    role: UserRole.REGULAR
                },
                chip: PlayerChip.CART,
                isActive: false,
                turnNumber: 0,
                balance: 0,
                actionCard: []
            },
            stage: GameTurnStage.MOVE,
            actionCard: null,
            gamePayments: [],
            expires: 0,
            updatedAt: new Date()
        },
        dices: [0, 0],
        houses: 0,
        hotels: 0,
        createdAt: new Date()
    },
    currentGameChat: {
        messages: [],
        totlaCount: 0
    }
}

const gamesSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setIsGatewayConnected(state: GamesStateT, action: PayloadAction<boolean>) {
            state.isGatewayConnected = action.payload
        },
        setStartingGameFlag(state: GamesStateT, action: PayloadAction<boolean>) {
            state.startingGameFlag = action.payload
        },
        setIsCurrentGameActive(state: GamesStateT, action: PayloadAction<boolean>) {
            state.isCurrentGameActive = action.payload
        },
        setCurrentGame(state: GamesStateT, action: PayloadAction<IGameState>) {
            state.currentGame = action.payload
        },
        pushGameChatMessagesPage(state: GamesStateT, action: PayloadAction<{ messagesList: IGameChatMessage[], totalCount: number }>) {
            action.payload.messagesList.forEach((message: IGameChatMessage) => state.currentGameChat.messages.push(message))
            state.currentGameChat.totlaCount = action.payload.totalCount
        },
        pushGameChatMessage(state: GamesStateT, action: PayloadAction<IGameChatMessage>) {
            console.log(action.payload)
            state.currentGameChat.messages.push(action.payload)
            state.currentGameChat.totlaCount++
        },
        clearGameChatMessages(state: GamesStateT, _: PayloadAction<void>) {
            state.currentGameChat.messages = []
            state.currentGameChat.totlaCount = 0
        },
        pushGamePreviewsPage(state: GamesStateT, action: PayloadAction<{ gamePreviewsList: IGamePreview[], totalCount: number }>) {
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
    setIsGatewayConnected, setIsCurrentGameActive, setStartingGameFlag, setCurrentGame,
    pushGameChatMessagesPage, pushGameChatMessage, clearGameChatMessages,
    pushGamePreviewsPage, pushGame, clearGames, updateGameField, setGameTurn,
    setDices, updatePlayer } = gamesSlice.actions;

export default gamesSlice.reducer;