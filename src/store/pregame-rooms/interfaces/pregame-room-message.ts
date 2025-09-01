import { UserT } from "../../types/auth"

export interface IPregameRoomMessage {
    id: string,
    text: string,
    sender: UserT
    createdAt: Date
}