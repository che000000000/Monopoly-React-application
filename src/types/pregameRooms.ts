import { UserRole } from "../store/enums/user-role"

export type PregameRoomMemberT = {
    id: string,
    name: string,
    avatarUrl: string,
    slot: number,
    isOwner: boolean,
    role: UserRole
}

export type PregameRoomT = {
    id: string
    members: PregameRoomMemberT[],
    createdAt: string
}

export type PushPregameRoomsPayloadT = {
    pregameRooms: PregameRoomT[]
}

export type PregameRoomsStateT = {
    pregameRooms: PregameRoomT[]
    currentPregameRoom: PregameRoomT | null
}