import { IPregameRoomMessage } from "../interfaces/pregame-room-message"

export interface IPregameRoomChat {
    messages: IPregameRoomMessage[],
    totalCount: number
}