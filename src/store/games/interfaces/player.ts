import { PlayerChip } from "../../enums/player-chip"
import { PlayerStatus } from "../../enums/player-status"
import { UserT } from "../../types/auth"

export interface IPlayer {
    id: string,
    chip: PlayerChip
    user: UserT,
    status: PlayerStatus,
    turnNumber: number,
    balance: 1500,
}