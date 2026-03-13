import { PlayerChip } from "../../../interfaces/player"
import { IPregameRoomMember } from "./pregame-room-member"

export interface IPregameRoom {
    id: string
    members: IPregameRoomMember[],
    isCurrent: boolean,
    availableChips: PlayerChip[]
    createdAt: Date
}