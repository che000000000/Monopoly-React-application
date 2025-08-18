import { UserT } from "../../../../store/types/auth"

export type MainPageChatMessageT = {
    id: string,
    text: string,
    sender: UserT
    createdAt: string
}