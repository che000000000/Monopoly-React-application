import { UserRole } from "../enums/user-role"
import { UserT } from "./auth"

export type PregameRoomMemberT = {
    id: string,
    name: string,
    avatarUrl: string,
    isOwner: boolean,
    role: UserRole
}

export type PregameRoomT = {
    id: string
    members: PregameRoomMemberT[],
    isCurrent: boolean,
    createdAt: string
}

export type SetPregameRoomMembersPayloadT = {
    pregameRoom: PregameRoomT,
    user: UserT
}

export type PregameRoomsStateT = {
    isGatewayConnected: boolean,
    authUser: UserT | null,
    pregameRooms: PregameRoomT[]
}