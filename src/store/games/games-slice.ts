import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserRole } from "../enums/user-role";
import { PlayerChip } from "../enums/player-chip";
import { PlayerStatus } from "../enums/player-status";
import { GamesStateT } from "./types/games-state";
import { IGameChatMessage } from "./interfaces/game-chat-message";
import { IGameState } from "./interfaces/game-state";

const initialState: GamesStateT = {
    isGatewayConnected: false,
    games: [],
    currentPlayer: {
        id: '1',
        user: {
            id: '1',
            name: 'видеокал-',
            avatarUrl: 'https://avatars.mds.yandex.net/get-shedevrum/11511289/f64db62ec6d411eebe70aa2339796401/orig',
            role: UserRole.REGULAR
        },
        chip: PlayerChip.CART,
        status: PlayerStatus.IS_TURN_OWNER,
        turnNumber: 1,
        balance: 1500,
    },
    currentGame: null,
    currentGameChat: []
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
        pushMessage(state, action: PayloadAction<IGameChatMessage>) {
            
        }
    }
})

export const { setIsGatewayConnected, setCurrentGame, pushMessage } = gamesSlice.actions;

export default gamesSlice.reducer;