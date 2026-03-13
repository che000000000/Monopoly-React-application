import { IGameChatMessage } from "../../../../store/interfaces/game-chat-message";

export interface GameChatMessagesPageMessage {
    messagesList: IGameChatMessage[],
    totalCount: number
}