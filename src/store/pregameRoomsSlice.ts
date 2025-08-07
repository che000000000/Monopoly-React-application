import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { PushPregameRoomsPayloadT, type PregameRoomsStateT } from "../types/pregameRooms";
import { UserRole } from "./enums/user-role";

const initialState: PregameRoomsStateT = {
    pregameRooms: [
        {
            id: '1',
            members: [
                {
                    id: '3',
                    name: 'видеокал-',
                    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkEfGn7ner5O1tTQAk9HBUhT_z8phEhvGtrQ&s',
                    slot: 1,
                    isOwner: true,
                    role: UserRole.REGULAR
                },
                {
                    id: '4',
                    name: 'Koka',
                    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGtI0IPVxNpeV1YleZyyVfYVIZZn1hKxBsQ&s',
                    slot: 2,
                    isOwner: false,
                    role: UserRole.REGULAR
                },
                {
                    id: '3',
                    name: 'Русец отсосской кратодемии',
                    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGB3V-tAqVQV4bwaakhE54_sbT_MBKBX1Pv4pTktsdsILoyR46',
                    slot: 3,
                    isOwner: true,
                    role: UserRole.REGULAR
                },
                {
                    id: '4',
                    name: 'Sn1k',
                    avatarUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRrg-RoaiWeDBlA0VQcaAHtgvpzsrUaLHaZsJSOxQ2Tz1ITjK6x',
                    slot: 4,
                    isOwner: false,
                    role: UserRole.REGULAR
                },
                {
                    id: '5',
                    name: 'WAGO',
                    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-4VTJtbq4Auf3kcUjtyHUwNuOxzn7Bn99Ww&s',
                    slot: 5,
                    isOwner: false,
                    role: UserRole.REGULAR
                }
            ],
            createdAt: '03.08.2025'
        },
        {
            id: '2',
            members: [
                {
                    id: '5',
                    name: 'уебан',
                    avatarUrl: 'https://m.media-amazon.com/images/I/51f7XSQcmVL._UXNaN_FMjpg_QL85_.jpg',
                    isOwner: true,
                    slot: 1,
                    role: UserRole.REGULAR
                },
                {
                    id: '6',
                    name: 'che000',
                    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTnPHSyO97SPouZ-oCujaQHoG8bSWM7Y7uxQ&s',
                    slot: 3,
                    isOwner: false,
                    role: UserRole.REGULAR
                }
            ],
            createdAt: '03.08.2025'
        }
    ],
    currentPregameRoom: null
}

const pregameRoomsSlice: Slice = createSlice({
    name: 'pregame',
    initialState,
    reducers: {
        pushPregameRooms(state, action: PayloadAction<PushPregameRoomsPayloadT>) {
            state.pregameRooms.push([action.payload.pregameRooms])
        }
    }
})

export const { pushPregameRooms } = pregameRoomsSlice.actions

export default pregameRoomsSlice.reducer