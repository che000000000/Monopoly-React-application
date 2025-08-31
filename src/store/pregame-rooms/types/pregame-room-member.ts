import { PlayerChip } from "../../enums/player-chip"
import { UserT } from "../../types/auth"

export type PregameRoomMemberT = {
    id: string,
    slot: number,
    playerChip: PlayerChip,
    isOwner: boolean,
    user: UserT,
    createdAt: Date
}