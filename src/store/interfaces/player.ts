import { IUser } from "./user"

export enum PlayerStatus {
    COMMON = 'COMMON',
    IS_LEFT = 'IS_LEFT'
}

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
    status: PlayerStatus
    turnNumber: number,
    balance: number
}