import { ISendPregameRoomMessage } from "./send-pregame-room-message";

export interface IPregameRoomMessagesPage {
    messagesList: ISendPregameRoomMessage[],
    totalCount: number
}