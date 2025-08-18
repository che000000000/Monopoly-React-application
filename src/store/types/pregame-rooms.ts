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

export type CurrentPregameRoomChatMessageT = {
    id: string,
    text: string,
    sender: UserT
    createdAt: string
}

export type SetPregameRoomMembersPayloadT = {
    pregameRoom: PregameRoomT,
    user: UserT
}

export type PregameRoomsStateT = {
    isGatewayConnected: boolean,
    authUser: UserT | null,
    currentPregameRoomChatMessages: CurrentPregameRoomChatMessageT[]
    pregameRooms: PregameRoomT[]
}