import { GameTurnStage } from "../../../enums/game-turn-stage"
import { IActionCard } from "./action-card"
import { IGamePayment } from "./game-payment"
import { IPlayer } from "./player"

export interface IGameTurn {
    id: string,
    player: IPlayer
    stage: GameTurnStage
    actionCard: IActionCard | null
    gamePayment: IGamePayment | null
    expires: number
    updatedAt: Date
}