import { UserRole } from "../store/enums/user-role"

export type MessageSenderT = {
    id: string,
    name: string,
    avatarUrl: string,
    role: UserRole
}

export type GlobalChatMessageT = {
    id: string,
    text: string,
    sender: MessageSenderT,
    createdAt: string
}

export type PushMessagesPayloadT = {
    messages: GlobalChatMessageT[]
}

export type GlobalChatStateT = {
    globalChatMessages: GlobalChatMessageT[]
}