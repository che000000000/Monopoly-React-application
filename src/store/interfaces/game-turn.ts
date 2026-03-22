import { IActionCard } from "./action-card"
import { IGamePayment } from "./game-payment"
import { IPlayer } from "./player"

export enum GameTurnStage {
    MOVE = 'MOVE',
    ROLL_OF_DICE_FOR_MOVE = 'ROLL_OF_DICE_FOR_MOVE',
    ROLL_OF_DICE_FOR_GET_OUT_OF_JAIL = 'ROLL_OF_DICE_FOR_GET_OUT_OF_JAIL',
    BUY_GAME_FIELD = 'BUY_GAME_FIELD',
    PAY_RENT = 'PAY_RENT',
    PAY_TAX = 'PAY_TAX',
    GO_TO_JAIL = 'GO_TO_JAIL',
    AT_JAIL = 'AT_JAIL',
    BUYOUT_FROM_JAIL = 'BUYOUT_FROM_JAIL',
    ACTION_CARD_SHOWTIME = 'ACTION_CARD_SHOWTIME',
    PAY_MONEY = 'PAY_MONEY',
    PAY_PLAYERS = 'PAY_PLAYERS',
    GET_PAYMENT_FROM_PLAYERS = 'GET_PAYMENT_FROM_PLAYERS',
    AYCTION = 'AUCTION',
    DEAL = 'DEAL'
}

export interface IGameTurn {
    id: string,
    player: IPlayer,
    stage: GameTurnStage,
    actionCard: IActionCard | null,
    gamePayments: IGamePayment[],
    expires: number,
    updatedAt: Date | string
}