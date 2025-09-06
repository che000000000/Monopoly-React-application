import { IGame } from "../interfaces/game"
import { IGameChatMessage } from "../interfaces/game-chat-message"
import { IGamePreview } from "../interfaces/game-preview"
import { IGameState } from "../interfaces/game-state"

export type GamesStateT = {
    isGatewayConnected: boolean
    startGameFlag: boolean
    games: {
        games: IGamePreview[],
        totalCount: number
    }
    currentGame: IGameState | null,
    currentGameChat: {
        messages: IGameChatMessage[]
        totlaCount: number
    }
}