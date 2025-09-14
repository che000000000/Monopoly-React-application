import { GamePaymentType } from "../../../enums/game-payment-type";

export interface IGamePayment {
    id: string,
    type: GamePaymentType,
    amount: number,
}