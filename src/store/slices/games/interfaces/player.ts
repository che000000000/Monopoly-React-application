import { PlayerChip } from "../../../enums/player-chip";
import { PlayerStatus } from "../../../enums/player-status";
import { IUser } from "../../auth/interfaces/user";

export interface IPlayer {
    id: string,
    chip: PlayerChip
    user: IUser,
    status: PlayerStatus,
    turnNumber: number,
    balance: 1500,
}