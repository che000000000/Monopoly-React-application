import { UserRole } from "../enums/user-role"

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
    createdAt: Date
}

export type PushMessagesPayloadT = {
    messages: GlobalChatMessageT[]
}

export type GlobalChatStateT = {
    globalChatMessages: GlobalChatMessageT[]
}