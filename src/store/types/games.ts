import { GameFieldColor } from "../enums/game-field-color"
import { GameFieldType } from "../enums/game-field-type"
import { PlayerChip } from "../enums/player-chip"
import { PlayerStatus } from "../enums/player-status"
import { UserRole } from "../enums/user-role"
import { UserT } from "./auth"

export type PlayerT = {
    id: string,
    chip: PlayerChip
    user: UserT,
    status: PlayerStatus,
    turnNumber: number,
    balance: 1500,
}

export type GameFieldT = {
    id: string,
    name: string,
    type: GameFieldType,
    color: GameFieldColor | null,
    position: number,
    players: PlayerT[] | null,
    owner: PlayerT | null,
    rent: number[] | null,
    housePrice: number | null,
    basePrice: number | null,
    buildsCount: number | null
}

export type GameTurnT = {
    id: string,
    playerId: string
    expires: number
}

export type GameChatMessageSenderT = {
    id: string,
    name: string,
    avatarUrl: string
    chip: PlayerChip,
    role: UserRole
}

export type GameChatMessageT = {
    id: string,
    text: string
    sender: GameChatMessageSenderT,
    sentTime: string
}

export type GameT = {
    id: string,
    currentTurn: GameTurnT | null,
    players: PlayerT[],
    fields: GameFieldT[],
    chatMessages: GameChatMessageT[],
    builds: {
        housesCount: number,
        hotelsCount: number
    }
    createdAt: string
}

export type GamesStateT = {
    games: GameT[]
    currentPlayer: PlayerT | null
    currentGame: GameT,
}