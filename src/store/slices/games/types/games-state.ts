import { IUser } from "../../auth/interfaces/user"
import { IGame } from "../interfaces/game"
import { IGameChatMessage } from "../interfaces/game-chat-message"
import { IGameState } from "../interfaces/game-state"

export type GamesStateT = {
    isGatewayConnected: boolean
    games: IGame[]
    currentGame: IGameState | null,
    currentGameChat: {
        messages: IGameChatMessage[]
        totlaCount: number
    }
}