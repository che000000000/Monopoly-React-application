import { PlayerChip } from "../../enums/player-chip"
import { PregameRoomMemberT } from "./pregame-room-member"

export type PregameRoomT = {
    id: string
    members: PregameRoomMemberT[],
    isCurrent: boolean,
    availableChips: PlayerChip[]
    createdAt: Date
}