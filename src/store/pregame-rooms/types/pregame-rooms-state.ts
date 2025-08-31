import { UserT } from "../../types/auth"
import { PregameRoomT } from "./pregame-room"
import { CurrentPregameRoomChatT } from "./pregame-room-chat"

export type PregameRoomsStateT = {
    authUser: UserT | null,
    currentPregameRoomChat: CurrentPregameRoomChatT
    pregameRooms: {
        pregameRoomsList: PregameRoomT[]
        totalCount: number
    }
}