export type AuthStateT = {
    isAuth: boolean
    user: {
        id: string,
        name: string,
        avatarUrl: string,
        role: string
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