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

export const getGamePreviewsPage = createAsyncThunk(
    'games/get-game-previews-page',
    (payload: { pageNumber?: number | null, pageSize?: number | null }) => {
        gamesGatewayService?.getGamePreviewsPage(payload.pageNumber, payload.pageSize)
    }
)

export const rollTheDiceForMove = createAsyncThunk(
    'games/roll-the-dice-for-move',
    () => {
        gamesGatewayService?.rollTheDiceForMove()
    }
)

export const rollDiceToGetOutOfJail = createAsyncThunk(
    'games/roll-dice-to-get-out-of-jail',
    () => {
        gamesGatewayService?.rollDiceToGetOutOfJail()
    }
)

export const buyoutFromJail = createAsyncThunk(
    'games/buyout-form-jail',
    () => {
        gamesGatewayService?.buyoutFromJail()
    }
)

export const buyGameField = createAsyncThunk(
    'games/buy-game-field',
    () => {
        gamesGatewayService?.buyGameField()
    }
)

export const payRent = createAsyncThunk(
    'games/pay-rent',
    () => {
        gamesGatewayService?.payRent()
    }
)

export const payTax = createAsyncThunk(
    'games/pay-tax',
    () => {
        gamesGatewayService?.payTax()
    }
)

export const payThePayment = createAsyncThunk(
    'games/pay-the-payment',
    (paymentId: string) => {
        gamesGatewayService?.payThePayment(paymentId)
    }
)

export const buildOnTheField = createAsyncThunk(
    'games/build-on-the-field',
    (fieldId: string) => {
        gamesGatewayService?.buildOnTheField(fieldId)
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