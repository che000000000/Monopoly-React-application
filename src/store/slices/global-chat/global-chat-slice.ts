import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalChatStateT } from "./types/global-chat-state";
import { IGLobalChatMessage } from "./interfaces/global-chat-message";

const initialState: GlobalChatStateT = {
    isGatewayConnected: false,
    globalChat: {
        messages: [],
        totalCount: 0
    }
}

const globalChatSlice = createSlice({
    name: 'global-chat',
    initialState,
    reducers: {
        setIsGatewayConnected(state: GlobalChatStateT, action: PayloadAction<boolean>) {
            state.isGatewayConnected = action.payload
        },
        pushGlobalChatMessage(state: GlobalChatStateT, action: PayloadAction<IGLobalChatMessage>) {
            state.globalChat.messages.push(action.payload)
            state.globalChat.totalCount++
        },
        pushGlobalChatMessagesPage(state: GlobalChatStateT, action: PayloadAction<{messagesList: IGLobalChatMessage[], totalCount: number}>) {
            action.payload.messagesList.forEach((message: IGLobalChatMessage) => state.globalChat.messages.push(message))
            state.globalChat.totalCount = action.payload.totalCount
        },
        clearGlobalChatMessages(state: GlobalChatStateT, action: PayloadAction<void>) {
            state.globalChat.messages = []
            state.globalChat.totalCount = 0
        }
    }
})

export const { setIsGatewayConnected, pushGlobalChatMessage, pushGlobalChatMessagesPage, clearGlobalChatMessages } = globalChatSlice.actions;

export default globalChatSlice.reducer;