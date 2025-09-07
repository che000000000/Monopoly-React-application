import { IGame } from "./game"
import { IGameChatMessage } from "./game-chat-message"
import { IGameField } from "./game-field"
import { IGameTurn } from "./game-turn"

export interface IGameState extends IGame {
    fields: IGameField[]
    turn: IGameTurn
    houses: number
    hotels: number,
}