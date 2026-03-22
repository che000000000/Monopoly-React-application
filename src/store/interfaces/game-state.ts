import { IGameField } from "./game-field"
import { IGameTurn } from "./game-turn"
import { IPlayer } from "./player"

export interface IGameState {
    id: string,
    fields: IGameField[]
    players: IPlayer[],
    turn: IGameTurn,
    dices: number[]
    houses: number
    hotels: number,
    createdAt: Date | string
}