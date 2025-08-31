import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { UserT } from "../types/auth";
import { PregameRoomMemberT } from "./types/pregame-room-member";
import { PregameRoomT } from "./types/pregame-room";
import { PregameRoomMessageT } from "./types/pregame-room-message";
import { PregameRoomsStateT } from "./types/pregame-rooms-state";
import { PushPregameRoomsPageT } from "./types/payload/push-pregame-rooms-page";
import { PushPregameRoomMessagePayloadT } from "./types/payload/push-pregame-room-message";
import { PushPregameRoomMessagesPagePayloadT } from "./types/payload/push-pregame-room-messages-page";
import { RemovePregameRoomPayloadT } from "./types/payload/remove-pregame-room";

const initialState: PregameRoomsStateT = {
    authUser: null,
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
        pushPregameRoom(state: PregameRoomsStateT, action: PayloadAction<PregameRoomT>) {
            const isCurrent = action.payload.members.some(
                (member: PregameRoomMemberT) => member.user.id === state.authUser?.id
            )

            state.pregameRooms.pregameRoomsList.push({
                ...action.payload,
                isCurrent
            })

            state.pregameRooms.totalCount++
        },
        pushPregameRoomsPage(state: PregameRoomsStateT, action: PayloadAction<PushPregameRoomsPageT>) {
            action.payload.pregameRoomsList.forEach((pregameRoom: PregameRoomT) => {
                const isCurrent = pregameRoom.members.some((member: PregameRoomMemberT) => member.user.id === state.authUser?.id)

                state.pregameRooms.pregameRoomsList.push({
                    ...pregameRoom,
                    isCurrent
                })
            })

            state.pregameRooms.totalCount = action.payload.totalCount
        },
        setPregameRoomMembers(state: PregameRoomsStateT, action: PayloadAction<PregameRoomT>) {
            console.log(action.payload)
            const pregameRoom = state.pregameRooms.pregameRoomsList.find((room: PregameRoomT) => room.id === action.payload.id)
            if (pregameRoom) {
                pregameRoom.members = action.payload.members

                const isAuthUserInTheRoom = pregameRoom.members.some((member: PregameRoomMemberT) => member.user.id === state.authUser?.id)
                isAuthUserInTheRoom ? pregameRoom.isCurrent = true : pregameRoom.isCurrent = false
            }
        },
        removePregameRoom(state: PregameRoomsStateT, action: PayloadAction<RemovePregameRoomPayloadT>) {
            state.pregameRooms.pregameRoomsList = state.pregameRooms.pregameRoomsList
                .filter((room: PregameRoomT) => room.id !== action.payload.id)

            state.pregameRooms.totalCount--
        },
        setPregameRoomsTotalCount(state: PregameRoomsStateT, action: PayloadAction<number>) {
            state.pregameRooms.totalCount = action.payload
        },
        pushCurrentPregameRoomMessage(state: PregameRoomsStateT, action: PayloadAction<PregameRoomMessageT>) {
            state.currentPregameRoomChat.messages.push(action.payload)
            state.currentPregameRoomChat.totalCount++
        },
        pushCurrentPregameRoomMessagesPage(state: PregameRoomsStateT, action: PayloadAction<PushPregameRoomMessagesPagePayloadT>) {
            action.payload.messagesList.forEach((message: PregameRoomMessageT) => state.currentPregameRoomChat.messages.push(message))
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