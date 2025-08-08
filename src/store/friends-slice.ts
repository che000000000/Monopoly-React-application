import { createSlice } from "@reduxjs/toolkit"
import { FriendsStateT } from "../types/friends"
import { UserRole } from "./enums/user-role";

const initialState: FriendsStateT = {
    friends: [
        // {
        //     id: '8',
        //     name: 'пиздач',
        //     avatarUrl: 'https://memi.klev.club/uploads/posts/2024-12/memi-klev-club-bwaf-p-memi-sobaka-s-khlebom-v-lapakh-4.jpg',
        //     role: UserRole.REGULAR
        // },
        // {
        //     id: '2',
        //     name: 'Koka',
        //     avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGtI0IPVxNpeV1YleZyyVfYVIZZn1hKxBsQ&s',
        //     role: UserRole.REGULAR
        // },
        // {
        //     id: '3',
        //     name: 'Русец отсосской кратодемии',
        //     avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGB3V-tAqVQV4bwaakhE54_sbT_MBKBX1Pv4pTktsdsILoyR46',
        //     role: UserRole.REGULAR
        // },
        // {
        //     id: '4',
        //     name: 'Sn1k',
        //     avatarUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRrg-RoaiWeDBlA0VQcaAHtgvpzsrUaLHaZsJSOxQ2Tz1ITjK6x',
        //     role: UserRole.REGULAR
        // },
        // {
        //     id: '9',
        //     name: 'загадка',
        //     avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyNmX3t2dI5HKc7a_RxVNzqrmNWrHGnkX_iA&s',
        //     role: UserRole.REGULAR
        // }
    ],
    friendsRequests: []
}

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {}
})

export const { } = friendsSlice.actions;

export default friendsSlice.reducer;