import { PregameRoomMessageT } from "./pregame-room-message"

export type CurrentPregameRoomChatT = {
    messages: PregameRoomMessageT[],
    totalCount: number
}