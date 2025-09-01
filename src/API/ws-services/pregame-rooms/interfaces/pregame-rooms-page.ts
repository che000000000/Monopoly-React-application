import { IPregameRoom } from "../../../../store/pregame-rooms/interfaces/pregame-room"

export interface IPregameRoomsPage {
    pregameRoomsList: IPregameRoom[]
    totalCount: number
}