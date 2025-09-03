import { IGLobalChatMessage } from "../interfaces/global-chat-message"

export type GlobalChatStateT = {
    isGatewayConnected: boolean
    globalChat: {
        messages: IGLobalChatMessage[]
        totalCount: number
    }
}