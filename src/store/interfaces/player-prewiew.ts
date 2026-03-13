import { PlayerChip, PlayerStatus } from "./player";
import { IUser } from "./user";

export interface IPlayerPreview {
    id: string,
    user: IUser,
    chip: PlayerChip,
    status: PlayerStatus
}