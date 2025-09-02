import { IUser } from "../../auth/interfaces/user"
import { IPregameRoom } from "../interfaces/pregame-room"
import { IPregameRoomMessage } from "../interfaces/pregame-room-message"

export type PregameRoomsStateT = {
    authUser: IUser | null,
    isGatewayConnected: boolean,
    currentPregameRoomChat: {
        messages: IPregameRoomMessage[],
        totalCount: number
    }
    pregameRooms: {
        pregameRoomsList: IPregameRoom[]
        totalCount: number
    }
}