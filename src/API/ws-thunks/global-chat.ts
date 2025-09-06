import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunkApi } from "../../store";
import { GlobalChatGatewayService } from "../ws-services/global-chat/global-chat.service";

let globalChatGatewayService: GlobalChatGatewayService | null = null

export const connectGlobalChatGateway = createAsyncThunk<void, void, AppThunkApi>(
    'pregame-rooms/gateway-connection',
    (_, { dispatch }) => {
        if (!globalChatGatewayService) {
            globalChatGatewayService = new GlobalChatGatewayService(dispatch)

            globalChatGatewayService.connect()
        }
    }
)

export const getGlobalChatMessagesPage = createAsyncThunk(
    'pregame-rooms/get-global-chat-messages-page',
    (payload: { pageNumber?: number | null, pageSize?: number | null }) => {
        globalChatGatewayService?.getGlobalChatMessagesPage(payload.pageNumber, payload.pageSize)
    }
)

export const sendGlobalChatMessage = createAsyncThunk(
    'global-chat/send-globlal-chat-message',
    (payload: { messageText: string }) => {
        globalChatGatewayService?.sendGlobalChatMessage(payload.messageText)
    }
)