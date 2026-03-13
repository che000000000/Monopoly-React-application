import { PlayerChip } from "./player"
import { UserRole } from "./user"

export interface IGameChatMessageSender {
    id: string | null,
    name: string | null,
    avatarUrl: string | null
    chip: PlayerChip,
    role: UserRole | null
}