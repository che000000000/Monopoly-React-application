import { IGame } from "../interfaces/game"
import { IGameChatMessage } from "../interfaces/game-chat-message"
import { IGameState } from "../interfaces/game-state"
import { IPlayer } from "../interfaces/player"

export type GamesStateT = {
    isGatewayConnected: boolean
    games: IGame[]
    currentPlayer: IPlayer | null
    currentGame: IGameState | null,
    currentGameChat: IGameChatMessage[]
}