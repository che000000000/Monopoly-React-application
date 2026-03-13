import { PlayerChip } from "../../../interfaces/player"
import { IUser } from "../../../interfaces/user"

export type IPregameRoomMember = {
    id: string,
    slot: number,
    playerChip: PlayerChip,
    isOwner: boolean,
    user: IUser,
    createdAt: Date
}