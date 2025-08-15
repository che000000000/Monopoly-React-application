import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { PregameRoomsStateT, PregameRoomT, SetPregameRoomMembersPayloadT } from "./types/pregame-rooms";
import { UserT } from "./types/auth";

const initialState: PregameRoomsStateT = {
    isGatewayConnected: false,
    authUser: null,
    pregameRooms: [],
}

const pregameRoomsSlice: Slice = createSlice({
    name: 'pregame-rooms',
    initialState,
    reducers: {
        setAuthUser(state, action: PayloadAction<UserT>) {
            state.authUser = action.payload
        },
        setIsPregameGatewayConnected(state, action: PayloadAction<boolean>) {
            state.isGatewayConnected = action.payload
        },
        clearPregameRooms(state, action: PayloadAction<null>) {
            state.pregameRooms = []
        },
        pushPregameRoom(state, action: PayloadAction<PregameRoomT>) {
            if (action.payload.members.find((user: UserT) => user.id === state.authUser.id)) {
                state.pregameRooms.push({
                    ...action.payload,
                    isCurrent: true
                })
            } else {
                state.pregameRooms.push({
                    ...action.payload,
                    isCurrent: false
                })
            }
        },
        pushPregameRooms(state, action: PayloadAction<PregameRoomT[]>) {
            action.payload.map(room => {
                if (room.members.find((user: UserT) => user.id === state.authUser.id)) {
                    state.pregameRooms.push({
                        ...room,
                        isCurrent: true
                    })
                } else {
                    state.pregameRooms.push({
                        ...room,
                        isCurrent: false
                    })
                }
            })
        },
        setPregameRoomMembers(state, action: PayloadAction<SetPregameRoomMembersPayloadT>) {
            const pregameRoom = state.pregameRooms.find((room: PregameRoomT) => room.id === action.payload.pregameRoom.id)
            if (pregameRoom) {
                pregameRoom.members = action.payload.pregameRoom.members

                const isAuthUserInTheRoom = pregameRoom.members.some((user: UserT) => user.id === state.authUser.id)
                isAuthUserInTheRoom ? pregameRoom.isCurrent = true : pregameRoom.isCurrent = false
            }
        },
        removePregameRoom(state, action: PayloadAction<string>) {
            state.pregameRooms = state.pregameRooms
                .filter((room: PregameRoomT) => room.id !== action.payload)
        }
    },
})

export const {
    setAuthUser,
    setIsPregameGatewayConnected,
    clearPregameRooms,
    pushPregameRoom,
    pushPregameRooms,
    setPregameRoomMembers,
    removePregameRoom
} = pregameRoomsSlice.actions;

export default pregameRoomsSlice.reducer;