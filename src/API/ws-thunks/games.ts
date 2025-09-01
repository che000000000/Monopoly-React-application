import { createAsyncThunk } from "@reduxjs/toolkit";
import { GamesGatewayService } from "../ws-services/games/games.service";
import { AppThunkApi } from "../../store";

let gamesGatewayService: GamesGatewayService | null = null

export const connectGamesGateway = createAsyncThunk<GamesGatewayService, void, AppThunkApi>(
    'games/gateway-connection',
    (_, { dispatch, getState }) => {
        if (!gamesGatewayService) {
            gamesGatewayService = new GamesGatewayService(dispatch)

            gamesGatewayService.connect()
        }

        return gamesGatewayService
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
    (gameId?: string) => {
        // console.log(gameId)
        gamesGatewayService?.getGameState(gameId)
    }
)