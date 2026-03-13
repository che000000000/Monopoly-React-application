import { IUser } from "../../../interfaces/user"

export interface IPregameRoomMessage {
    id: string,
    text: string,
    sender: IUser
    createdAt: Date
}