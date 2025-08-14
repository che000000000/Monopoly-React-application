import { UserT } from "./auth"

export type FriendRequestT = {
    id: string,
    from: UserT,
    to: UserT,
    createdAt: string
}

export type FriendsStateT = {
    activeFriends: UserT[],
    friendsRequests: FriendRequestT[]
}