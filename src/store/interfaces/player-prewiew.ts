import { PlayerChip } from "./player";
import { IUser } from "./user";

export interface IPlayerPreview {
    id: string,
    user: IUser,
    chip: PlayerChip,
    isActive: boolean
}