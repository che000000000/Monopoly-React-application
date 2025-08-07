import { UserRole } from "../store/enums/user-role"

export type AuthStateT = {
    isAuth: boolean
    user: {
        id: string,
        name: string,
        avatarUrl: string,
        role: UserRole
    }
}

export type LoginUserPayloadT = {
    login: string,
    password: string
}

export type RegisterUserPayloadT = {
    login: string,
    password: string,
    confirmPassword: string
}