import { PlayerChip } from "../../enums/player-chip"
import { IPregameRoomMember } from "../interfaces/pregame-room-member"

export interface IPregameRoom {
    id: string
    members: IPregameRoomMember[],
    isCurrent: boolean,
    availableChips: PlayerChip[]
    createdAt: Date
}