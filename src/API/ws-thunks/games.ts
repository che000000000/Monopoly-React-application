import { createAsyncThunk } from "@reduxjs/toolkit";
import { GamesGatewayService } from "../ws-services/games/games.service";
import { AppThunkApi } from "../../store";

let gamesGatewayService: GamesGatewayService | null = null

export const connectGamesGateway = createAsyncThunk<void, void, AppThunkApi>(
    'games/gateway-connection',
    (_, { dispatch, getState }) => {
        if (!gamesGatewayService) {
            gamesGatewayService = new GamesGatewayService(dispatch)

            gamesGatewayService.connect()
        }
    }
)

export const startGame = createAsyncThunk(
    'games/start-game',
    () => {
        gamesGatewayService?.startGame()
    }
)

export const getGameState = createAsyncThunk(
    'games/get-game-state',
    () => {
        gamesGatewayService?.getGameState()
    }
)

export const getGameChatMessagesPage = createAsyncThunk(
    'games/get-game-chat-messages-page',
    (payload: { pageNumber?: number | null, pageSize?: number | null }) => {
        gamesGatewayService?.getGameChatMessagesPage(payload.pageNumber, payload.pageSize)
    }
)

export const sendGameChatMessage = createAsyncThunk(
    'games/send-game-chat-message',
    (payload: { messageText: string }) => {
        gamesGatewayService?.sendGameChatMessage(payload.messageText)
    }
)

export const getGamePreviewsPage = createAsyncThunk(
    'games/get-game-previews-page',
    (payload: { pageNumber?: number | null, pageSize?: number | null }) => {
        gamesGatewayService?.getGamePreviewsPage(payload.pageNumber, payload.pageSize)
    }
)