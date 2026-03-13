import { IUser } from "../../../interfaces/user";

export interface IGLobalChatMessage {
    id: string,
    text: string,
    sender: IUser | null,
    createdAt: Date
}