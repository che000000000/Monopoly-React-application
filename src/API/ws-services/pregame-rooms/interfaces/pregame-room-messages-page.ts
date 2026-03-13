import { IPregameRoomMessage } from "../../../../store/slices/pregame-rooms/interfaces/pregame-room-message";

export interface IPregameRoomMessagesPage {
    messagesList: IPregameRoomMessage[],
    totalCount: number
}