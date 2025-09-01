import { PlayerChip } from "../../enums/player-chip"
import { UserRole } from "../../enums/user-role"

export interface IGameChatMessageSender {
    id: string,
    name: string,
    avatarUrl: string
    chip: PlayerChip,
    role: UserRole
}