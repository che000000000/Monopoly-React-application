import { IActionCard } from "./action-card"
import { IUser } from "./user"

export enum PlayerChip {
    CART= 'CART',
    HAT = 'HAT',
    IRON = 'IRON',
    PENGUIN = 'PENGUIN',
    THIMBLE = 'THIMBLE'
}

export interface IPlayer {
    id: string,
    user: IUser,
    chip: PlayerChip,
    isActive: boolean,
    turnNumber: number,
    balance: number,
    actionCard: IActionCard
}