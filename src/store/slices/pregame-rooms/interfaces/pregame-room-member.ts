import { PlayerChip } from "../../../enums/player-chip"
import { IUser } from "../../auth/interfaces/user"

export type IPregameRoomMember = {
    id: string,
    slot: number,
    playerChip: PlayerChip,
    isOwner: boolean,
    user: IUser,
    createdAt: Date
}