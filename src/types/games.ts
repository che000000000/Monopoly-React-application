import { PlayerStatus } from "../Components/player/in-game-player/InGamePlayer"
import { GameFieldColor } from "../store/enums/game-field-color"
import { GameFieldType } from "../store/enums/game-field-type"
import { PlayerChip } from "../store/enums/player-chip"
import { UserRole } from "../store/enums/user-role"

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
    players: PlayerT[],
    fields: GameFieldT[],
    currentTurn: GameTurnT | null,
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