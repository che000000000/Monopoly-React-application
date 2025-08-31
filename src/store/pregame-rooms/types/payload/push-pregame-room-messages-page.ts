import { PregameRoomMessageT } from "../pregame-room-message"

export type PushPregameRoomMessagesPagePayloadT = {
    messagesList: PregameRoomMessageT[],
    totalCount: number
}