import { PregameRoomMessageT } from "../../../../store/pregame-rooms/types/pregame-room-message";

export interface IPregameRoomMessagesPage {
    messagesList: PregameRoomMessageT[],
    totalCount: number
}