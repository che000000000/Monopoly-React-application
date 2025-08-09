import { PlayerStatus } from "../Components/player/in-game-player/InGamePlayer"
import { GameFieldColor } from "../store/enums/game-field-color"
import { GameFieldType } from "../store/enums/game-field-type"
import { PlayerChip } from "../store/enums/player-chip"
import { UserRole } from "../store/enums/user-role"
import { UserT } from "./auth"

export type PlayerT = {
    id: string,
    chip: PlayerChip
    name: string,
    avatarUrl: string,
    turnNumber: number,
    status: PlayerStatus
    balance: 1500,
    role: UserRole
}

export type GameFieldT = {
    id: string,
    type: GameFieldType,
    name: string,
    color: GameFieldColor | null,
    owner: PlayerT | null,
    players: PlayerT[] | null,
    rent: number[] | null,
    housePrice: number | null,
    basePrice: number | null,
    position: number,
    buildsCount: number | null
}

export type GameTurnT = {
    id: string,
    playerId: string
    expires: number
}

export type GameChatMessageT = {
    id: string,
    text: string
    sender: UserT,
    createdAt: string
}

export type GameT = {
    id: string,
    players: PlayerT[],
    fields: GameFieldT[],
    currentTurn: GameTurnT | null,
    chatId: string,
    chatMessages: GameChatMessageT[],
    createdAt: string
}

export type GamesStateT = {
    games: GameT[]
    currentGame: GameT,
}