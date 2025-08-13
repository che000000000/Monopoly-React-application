import { UserRole } from "../store/enums/user-role"

export type UserT = {
    id: string,
    name: string,
    avatarUrl: string,
    role: UserRole
}

export type LoginUserPayloadT = {
    id: string,
    name: string,
    avatarUrl: string,
    role: UserRole
}

export type AuthStateT = {
    isAuth: boolean
    user: UserT | null,
    oauthUrl: string | null
}