import { IPlayer } from "./player";

export enum GamePaymentType {
    BUY_GAME_FIELD = 'BUY_GAME_FIELD',
    PAY_RENT = 'PAY_PROPERTY_RENT',
    PAY_TAX = 'PAY_TAX',
    BUYOUT_FROM_JAIL = 'BUYOUT_FROM_JAIL',
    TO_BANK = 'TO_BANK',
    TO_PLAYER = 'TO_PLAYER',
    TO_PLAYERS = 'TO_PLAYERS',
}

export interface IGamePayment {
    id: string,
    type: GamePaymentType,
    amount: number,
    payerPlayer: IPlayer,
    receiverPaymentPlayer: IPlayer | null,
    isOptional: boolean
}