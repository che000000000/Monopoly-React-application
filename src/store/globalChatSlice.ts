import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalChatStateT, PushMessagesPayloadT } from "../types/globalChat";
import { UserRole } from "./enums/user-role";

const initialState: GlobalChatStateT = {
    globalChatMessages: [
        {
            id: '1',
            text: 'Привет всем!',
            sender: {
                id: '2',
                name: 'Koka',
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGtI0IPVxNpeV1YleZyyVfYVIZZn1hKxBsQ&s',
                role: UserRole.REGULAR
            },
            createdAt: '14:32'
        },
        {
            id: '2',
            text: 'иди нахуй, ЧМО!',
            sender: {
                id: '5',
                name: 'WAGO',
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-4VTJtbq4Auf3kcUjtyHUwNuOxzn7Bn99Ww&s',
                role: UserRole.REGULAR
            },
            createdAt: '14:35'
        },
        {
            id: '3',
            text: 'ребята, давайте жить дружно)) я ебу козу, я не знаю почему я ебу козу, я не знаю почему я ебу козу, я не знаю почему я ебу козу, я не знаю почему',
            sender: {
                id: '3',
                name: 'Русец отсосской кратодемии',
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGB3V-tAqVQV4bwaakhE54_sbT_MBKBX1Pv4pTktsdsILoyR46',
                role: UserRole.REGULAR
            },
            createdAt: '14:35'
        },
        {
            id: '4',
            text: 'а',
            sender: {
                id: '1',
                name: 'видеокал',
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkEfGn7ner5O1tTQAk9HBUhT_z8phEhvGtrQ&s',
                role: UserRole.REGULAR
            },
            createdAt: '14:37'
        },
        {
            id: '5',
            text: 'вы че ебаны?!',
            sender: {
                id: '1',
                name: 'видеокал',
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkEfGn7ner5O1tTQAk9HBUhT_z8phEhvGtrQ&s',
                role: UserRole.REGULAR
            },
            createdAt: '14:37'
        },
        {
            id: '6',
            text: 'Ребят. Может пойдём в лобак?',
            sender: {
                id: '4',
                name: 'Sn1k',
                avatarUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRrg-RoaiWeDBlA0VQcaAHtgvpzsrUaLHaZsJSOxQ2Tz1ITjK6x',
                role: UserRole.REGULAR
            },
            createdAt: '14:38'
        }
    ]
}

const globalChatSlice = createSlice({
    name: 'global-chat',
    initialState,
    reducers: {
        pushMessages(state, action: PayloadAction<PushMessagesPayloadT>) {
            state.globalChatMessages.push(...action.payload.messages)
        }
    }
})

export const { pushMessages } = globalChatSlice.actions;

export default globalChatSlice.reducer;