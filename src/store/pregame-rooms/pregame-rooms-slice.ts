import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { UserT } from "../types/auth";
import { PregameRoomsStateT } from "./types/pregame-rooms-state";
import { IPregameRoomMember } from "./interfaces/pregame-room-member";
import { IPregameRoom } from "./interfaces/pregame-room";
import { IPregameRoomMessage } from "./interfaces/pregame-room-message";

const initialState: PregameRoomsStateT = {
    authUser: null,
    isGatewayConnected: false,
    currentPregameRoomChat: {
        messages: [],
        totalCount: 0
    },
    pregameRooms: {
        pregameRoomsList: [],
        totalCount: 0
    },
}

const pregameRoomsSlice: Slice = createSlice({
    name: 'pregame-rooms',
    initialState,
    reducers: {
        setAuthUser(state: PregameRoomsStateT, action: PayloadAction<UserT>) {
            state.authUser = action.payload
        },
        setIsGatewayConnected(state: PregameRoomsStateT, action: PayloadAction<boolean>) {
            state.isGatewayConnected = action.payload
        },
        pushPregameRoom(state: PregameRoomsStateT, action: PayloadAction<IPregameRoom>) {
            const isCurrent = action.payload.members.some(
                (member: IPregameRoomMember) => member.user.id === state.authUser?.id
            )

            state.pregameRooms.pregameRoomsList.push({
                ...action.payload,
                isCurrent
            })

            state.pregameRooms.totalCount++
        },
        pushPregameRoomsPage(state: PregameRoomsStateT, action: PayloadAction<{pregameRoomsList: IPregameRoom[], totalCount: number}>) {
            action.payload.pregameRoomsList.forEach((pregameRoom: IPregameRoom) => {
                const isCurrent = pregameRoom.members.some((member: IPregameRoomMember) => member.user.id === state.authUser?.id)

                state.pregameRooms.pregameRoomsList.push({
                    ...pregameRoom,
                    isCurrent
                })
            })

            state.pregameRooms.totalCount = action.payload.totalCount
        },
        setPregameRoomMembers(state: PregameRoomsStateT, action: PayloadAction<IPregameRoom>) {
            const pregameRoom = state.pregameRooms.pregameRoomsList.find((room: IPregameRoom) => room.id === action.payload.id)
            if (pregameRoom) {
                pregameRoom.members = action.payload.members

                const isAuthUserInTheRoom = pregameRoom.members.some((member: IPregameRoomMember) => member.user.id === state.authUser?.id)
                isAuthUserInTheRoom ? pregameRoom.isCurrent = true : pregameRoom.isCurrent = false
            }
        },
        removePregameRoom(state: PregameRoomsStateT, action: PayloadAction<string>) {
            state.pregameRooms.pregameRoomsList = state.pregameRooms.pregameRoomsList
                .filter((room: IPregameRoom) => room.id !== action.payload)

            state.pregameRooms.totalCount--
        },
        setPregameRoomsTotalCount(state: PregameRoomsStateT, action: PayloadAction<number>) {
            state.pregameRooms.totalCount = action.payload
        },
        pushCurrentPregameRoomMessage(state: PregameRoomsStateT, action: PayloadAction<IPregameRoomMessage>) {
            state.currentPregameRoomChat.messages.push(action.payload)
            state.currentPregameRoomChat.totalCount++
        },
        pushCurrentPregameRoomMessagesPage(state: PregameRoomsStateT, action: PayloadAction<{messagesList: IPregameRoomMessage[], totalCount: number}>) {
            action.payload.messagesList.forEach((message: IPregameRoomMessage) => state.currentPregameRoomChat.messages.push(message))
            state.currentPregameRoomChat.totalCount = action.payload.totalCount
        },
        clearPregameRooms(state: PregameRoomsStateT, action: PayloadAction<null>) {
            state.pregameRooms.pregameRoomsList = []
            state.pregameRooms.totalCount = 0
        },
        clearCurrentPregameRoomMessages(state: PregameRoomsStateT, action: PayloadAction<null>) {
            state.currentPregameRoomChat.messages = []
            state.currentPregameRoomChat.totalCount = 0
        }
    },
})

export const {
    setAuthUser,
    setIsGatewayConnected,
    pushPregameRoom,
    pushPregameRoomsPage,
    setPregameRoomMembers,
    removePregameRoom,
    setPregameRoomsTotalCount,
    pushCurrentPregameRoomMessage,
    pushCurrentPregameRoomMessagesPage,
    clearPregameRooms,
    clearCurrentPregameRoomMessages
} = pregameRoomsSlice.actions;

export default pregameRoomsSlice.reducer;