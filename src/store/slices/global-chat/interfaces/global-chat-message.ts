import { IUser } from "../../auth/interfaces/user";

export interface IGLobalChatMessage {
    id: string,
    text: string,
    sender: IUser,
    createdAt: Date
}