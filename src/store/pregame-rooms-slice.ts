import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { PregameRoomMemberT, PregameRoomMessageT, PregameRoomsStateT, PregameRoomT, PushPregameRoomMessagePayloadT, PushPregameRoomMessagesPayloadT, SetPregameRoomMembersPayloadT } from "./types/pregame-rooms";
import { UserT } from "./types/auth";

const initialState: PregameRoomsStateT = {
    isGatewayConnected: false,
    authUser: null,
    currentPregameRoomChat: {
        messages: [],
        totalCount: 0
    },
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
            if (action.payload.members.find((pregameRoommember: PregameRoomMemberT) => pregameRoommember.user.id === state.authUser.id)) {
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
            action.payload.forEach((pregameRoom: PregameRoomT) => {
                if (pregameRoom.members.find((pregameRoomMember: PregameRoomMemberT) => pregameRoomMember.user.id === state.authUser.id)) {
                    state.pregameRooms.push({
                        ...pregameRoom,
                        isCurrent: true
                    })
                } else {
                    state.pregameRooms.push({
                        ...pregameRoom,
                        isCurrent: false
                    })
                }
            })
        },
        setPregameRoomMembers(state, action: PayloadAction<SetPregameRoomMembersPayloadT>) {
            const pregameRoom = state.pregameRooms.find((room: PregameRoomT) => room.id === action.payload.pregameRoom.id)
            if (pregameRoom) {
                pregameRoom.members = action.payload.pregameRoom.members

                const isAuthUserInTheRoom = pregameRoom.members.some((member: PregameRoomMemberT) => member.user.id === state.authUser.id)
                isAuthUserInTheRoom ? pregameRoom.isCurrent = true : pregameRoom.isCurrent = false
            }
        },
        removePregameRoom(state, action: PayloadAction<string>) {
            state.pregameRooms = state.pregameRooms
                .filter((room: PregameRoomT) => room.id !== action.payload)
        },
        pushCurrentPregameRoomMessage(state, action: PayloadAction<PushPregameRoomMessagePayloadT>) {
            console.log(action.payload)
            state.currentPregameRoomChat.messages.push(action.payload.message)
            state.currentPregameRoomChat.totalCount = action.payload.totalCount
        },
        pushCurrentPregameRoomMessages(state, action: PayloadAction<PushPregameRoomMessagesPayloadT>) {
            action.payload.messages.map((message: PregameRoomMessageT) => state.currentPregameRoomChat.messages.push(message))
            state.currentPregameRoomChat.totalCount = action.payload.totalCount
        },
        clearCurrentPregameRoomMessages(state, action: PayloadAction<null>) {
            state.currentPregameRoomChat.messages = []
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
    removePregameRoom,
    pushCurrentPregameRoomMessage,
    pushCurrentPregameRoomMessages,
    clearCurrentPregameRoomMessages
} = pregameRoomsSlice.actions;

export default pregameRoomsSlice.reducer;