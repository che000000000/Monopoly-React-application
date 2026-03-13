import { IUser } from "../../../../store/interfaces/user"

export type MainPageChatMessageT = {
    id: string,
    text: string,
    sender: IUser | null,
    createdAt: Date
}