import { createAsyncThunk } from "@reduxjs/toolkit";
import { PregameRoomsGatewayService } from "../ws-services/pregame-rooms.service";
import { AppThunkApi } from "../../store";
import { setAuthUser } from "../../store/pregame-rooms-slice";

let pregameRoomsGatewayService: PregameRoomsGatewayService | null = null

export const connectPregameRoomsGateway = createAsyncThunk<PregameRoomsGatewayService, void, AppThunkApi>(
    'pregame-rooms/gateway-connection',
    (_, { dispatch, getState }) => {
        if (!pregameRoomsGatewayService) {
            pregameRoomsGatewayService = new PregameRoomsGatewayService(dispatch)

            const { auth } = getState()
            dispatch(setAuthUser(auth.user))
            pregameRoomsGatewayService.connect()
        }

        return pregameRoomsGatewayService
    }
)

export const disconnectPregameRoomsGateway = createAsyncThunk(
    'pregame-rooms/gateway-disconnection',
    () => {
        pregameRoomsGatewayService?.disconnect()
        pregameRoomsGatewayService = null
    }
)

export const joinPregameRoom = createAsyncThunk(
    'pregame-rooms/join-pregame-room',
    (pregameRoomId: string) => {
        pregameRoomsGatewayService?.joinPregameRoom(pregameRoomId)
    }
)

export const leavePregameRoom = createAsyncThunk(
    'pregame-rooms/leave-pregame-room',
    () => {
        pregameRoomsGatewayService?.leavePregameRoom()
    }
)

export const createPregameRoom = createAsyncThunk(
    'pregame-rooms/create-pregame-room',
    () => {
        pregameRoomsGatewayService?.createPregameRoom()
    }
)