import { IGame } from "./game"
import { IGameChatMessage } from "./game-chat-message"
import { IGameField } from "./game-field"

export interface IGameState extends IGame {
    fields: IGameField[]
    houses: number
    hotels: number,
}