import { PregameRoomT } from "../../../../store/pregame-rooms/types/pregame-room"

export interface IPregameRoomsPage {
    pregameRoomsList: PregameRoomT[]
    totalCount: number
}