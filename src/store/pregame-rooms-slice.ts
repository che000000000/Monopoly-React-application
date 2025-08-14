import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { PregameRoomsStateT, PregameRoomT } from "./types/pregame-rooms";

const initialState: PregameRoomsStateT = {
    isGatewayConnected: false,
    pregameRooms: [],
    currentPregameRoom: null,
}

const pregameRoomsSlice: Slice = createSlice({
    name: 'pregame-rooms',
    initialState,
    reducers: {
        setIsPregameGatewayConnected(state, action: PayloadAction<boolean>) {
            state.isGatewayConnected = action.payload
        },
        clearPregameRooms(state, action: PayloadAction<null>) {
            state.pregameRooms = []
        },
        pushPregameRoom(state, action: PayloadAction<PregameRoomT>) {
            state.pregameRooms.push(action.payload)
        },
        pushPregameRooms(state, action: PayloadAction<PregameRoomT[]>) {
            action.payload.map(room => state.pregameRooms.push(room))
        },
        updatePregameRoomMembers(state, action: PayloadAction<PregameRoomT>) {
            state.pregameRooms
                .find((room: PregameRoomT) => room.id === action.payload.id)
                .members = action.payload.members
        },
        removePregameRoom(state, action: PayloadAction<string>) {
            state.pregameRooms = state.pregameRooms
                .filter((room: PregameRoomT) => room.id !== action.payload)
        }
    },
})

export const {
    setIsPregameGatewayConnected,
    clearPregameRooms,
    pushPregameRoom,
    pushPregameRooms,
    updatePregameRoomMembers,
    removePregameRoom
} = pregameRoomsSlice.actions;

export default pregameRoomsSlice.reducer;