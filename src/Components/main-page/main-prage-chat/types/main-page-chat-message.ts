import { IUser } from "../../../../store/slices/auth/interfaces/user"

export type MainPageChatMessageT = {
    id: string,
    text: string,
    sender: IUser | null,
    createdAt: Date
}