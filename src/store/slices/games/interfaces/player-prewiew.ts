import { PlayerChip } from "../../../enums/player-chip";
import { PlayerStatus } from "../../../enums/player-status";
import { IUser } from "../../auth/interfaces/user";

export interface IPlayerPreview {
    id: string,
    user: IUser,
    chip: PlayerChip,
    status: PlayerStatus
}