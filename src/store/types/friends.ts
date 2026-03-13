import { IUser } from "../interfaces/user"

export type FriendRequestT = {
    id: string,
    from: IUser,
    to: IUser,
    createdAt: string
}

export type FriendsStateT = {
    activeFriends: IUser[],
    friendsRequests: FriendRequestT[]
}