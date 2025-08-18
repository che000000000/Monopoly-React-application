import { PlayerChip } from "../enums/player-chip"
import { UserT } from "./auth"

export type PregameRoomMemberT = {
    id: string,
    slot: number,
    playerChip: PlayerChip,
    isOwner: boolean,
    user: UserT,
    createdAt: Date
}

export type PregameRoomT = {
    id: string
    members: PregameRoomMemberT[],
    isCurrent: boolean,
    availableChips: PlayerChip[]
    createdAt: Date
}

export type PregameRoomMessageT = {
    id: string,
    text: string,
    sender: UserT
    createdAt: Date
}

export type CurrentPregameRoomChatT = {
    messages: PregameRoomMessageT[],
    totalCount: number
}

export type SetPregameRoomMembersPayloadT = {
    pregameRoom: PregameRoomT,
    user: UserT
}

export type PushPregameRoomMessagePayloadT = {
    message: PregameRoomMessageT,
    totalCount: number
}

export type PushPregameRoomMessagesPayloadT = {
    messages: PregameRoomMessageT[],
    totalCount: number
}

export type PregameRoomsStateT = {
    isGatewayConnected: boolean,
    authUser: UserT | null,
    currentPregameRoomChat: CurrentPregameRoomChatT
    pregameRooms: PregameRoomT[]
}