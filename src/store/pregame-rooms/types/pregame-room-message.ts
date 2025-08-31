import { UserT } from "../../types/auth"

export type PregameRoomMessageT = {
    id: string,
    text: string,
    sender: UserT
    createdAt: Date
}