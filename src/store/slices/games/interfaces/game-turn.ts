import { GameTurnStage } from "../../../enums/game-turn-stage"
import { IPlayer } from "./player"

export interface IGameTurn {
    id: string,
    player: IPlayer
    stage: GameTurnStage
    expires: number
    updatedAt: Date
}