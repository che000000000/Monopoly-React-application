import { IGameChatMessage } from "../../../interfaces/game-chat-message"
import { IGamePreview } from "../../../interfaces/game-preview"
import { IGameState } from "../../../interfaces/game-state"

export type GamesStateT = {
    isGatewayConnected: boolean
    startingGameFlag: boolean
    isCurrentGameActive: boolean
    games: {
        games: IGamePreview[],
        totalCount: number
    }
    currentGame: IGameState,
    currentGameChat: {
        messages: IGameChatMessage[]
        totlaCount: number
    }
}