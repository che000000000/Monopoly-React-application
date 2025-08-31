import { createAsyncThunk } from "@reduxjs/toolkit";
import { PregameRoomsGatewayService } from "../ws-services/pregame-rooms/pregame-rooms.service";
import { AppThunkApi } from "../../store";
import { setAuthUser } from "../../store/pregame-rooms/pregame-rooms-slice";
import { PlayerChip } from "../../store/enums/player-chip";

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
    (payload: { pregameRoomId: string, slot: number }) => {
        pregameRoomsGatewayService?.joinPregameRoom(payload.pregameRoomId, payload.slot)
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

export const setPregameRoomMemberSlot = createAsyncThunk(
    'pregame-rooms/set-pregame-room-member-slot',
    (payload: { slot: number }) => {
        pregameRoomsGatewayService?.setPregameRoomMemberSlot(payload.slot)
    }
)

export const getPregameRoomMessagesPage = createAsyncThunk(
    'pregame-rooms/get-pregame-room-messages-page',
    (payload: { pageNumber: number, pageSize: number }) => {
        pregameRoomsGatewayService?.getPregameRoomMessagesPage(payload.pageNumber, payload.pageSize)
    }
)

export const sendPregameRoomMessage = createAsyncThunk(
    'pregame-rooms/send-pregame-room-message',
    (payload: { messageText: string }) => {
        pregameRoomsGatewayService?.sendPregameRoomMessage(payload.messageText)
    }
)

export const setPlayerChip = createAsyncThunk(
    'pregame-rooms/set-player-chip',
    (payload: { playerChip: PlayerChip }) => {
        pregameRoomsGatewayService?.setPregameRoomMemberPlayerChip(payload.playerChip)
    }
)