import { IPregameRoom } from "../../../../store/slices/pregame-rooms/interfaces/pregame-room"

export interface IPregameRoomsPage {
    pregameRoomsList: IPregameRoom[]
    totalCount: number
}