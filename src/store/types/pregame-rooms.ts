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
    createdAt: string
}

export type PregameRoomsStateT = {
    isGatewayConnected: boolean,
    pregameRooms: PregameRoomT[]
    currentPregameRoom: PregameRoomT | null
}