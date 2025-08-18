import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { CurrentPregameRoomChatMessageT, PregameRoomMemberT, PregameRoomsStateT, PregameRoomT, SetPregameRoomMembersPayloadT } from "./types/pregame-rooms";
import { UserT } from "./types/auth";
import { UserRole } from "./enums/user-role";

const initialState: PregameRoomsStateT = {
    isGatewayConnected: false,
    authUser: null,
    currentPregameRoomChatMessages: [
        {
            id: '1',
            text: 'Привет всем!',
            sender: {
                id: '2',
                name: 'koka',
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGtI0IPVxNpeV1YleZyyVfYVIZZn1hKxBsQ&s',
                role: UserRole.REGULAR
            },
            createdAt: '14:32'
        },
        {
            id: '2',
            text: 'да запускай уже',
            sender: {
                id: '10',
                name: 'секаший',
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGtI0IPVxNpeV1YleZyyVfYVIZZn1hKxBsQ&s',
                role: UserRole.REGULAR
            },
            createdAt: '14:32'
        },
        {
            id: '1',
            text: 'Подожди. Диман придёт.',
            sender: {
                id: '2',
                name: 'koka',
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGtI0IPVxNpeV1YleZyyVfYVIZZn1hKxBsQ&s',
                role: UserRole.REGULAR
            },
            createdAt: '14:32'
        },
        {
            id: '1',
            text: 'ДА НЕ ХОЧУ Я ЖДАТЬ!!!"%;*№!',
            sender: {
                id: '2',
                name: 'секаший',
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGtI0IPVxNpeV1YleZyyVfYVIZZn1hKxBsQ&s',
                role: UserRole.REGULAR
            },
            createdAt: '14:32'
        },
    ],
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
        pushMessage(state, action: PayloadAction<CurrentPregameRoomChatMessageT>) {
            state.currentPregameRoomChatMessages.push(action.payload)
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
    pushMessage
} = pregameRoomsSlice.actions;

export default pregameRoomsSlice.reducer;