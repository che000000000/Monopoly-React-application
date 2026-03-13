import { IActionCard } from "./action-card"
import { IGamePayment } from "./game-payment"
import { IPlayer } from "./player"

export enum GameTurnStage {
    MOVE = 'MOVE',
    THROWING_DICES = 'THROWING_DICES',
    BUY_GAME_FIELD = 'BUY_GAME_FIELD',
    PAY_RENT = 'PAY_RENT',
    PAY_TAX = 'PAY_TAX',
    ACTION_CARD = 'ACTION_CARD',
    AYCTION = 'AUCTION',
    DEAL = 'DEAL'
}

export interface IGameTurn {
    id: string,
    player: IPlayer,
    stage: GameTurnStage,
    actionCard: IActionCard | null,
    gamePayments: IGamePayment[] | null,
    expires: number,
    updatedAt: Date
}