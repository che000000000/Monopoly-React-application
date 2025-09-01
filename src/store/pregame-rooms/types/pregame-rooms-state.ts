import { UserT } from "../../types/auth"
import { IPregameRoom } from "../interfaces/pregame-room"
import { IPregameRoomChat } from "../interfaces/pregame-room-chat"

export type PregameRoomsStateT = {
    authUser: UserT | null,
    isGatewayConnected: boolean,
    currentPregameRoomChat: IPregameRoomChat
    pregameRooms: {
        pregameRoomsList: IPregameRoom[]
        totalCount: number
    }
}