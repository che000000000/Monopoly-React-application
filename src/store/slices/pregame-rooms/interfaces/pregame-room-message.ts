import { IUser } from "../../auth/interfaces/user"

export interface IPregameRoomMessage {
    id: string,
    text: string,
    sender: IUser
    createdAt: Date
}