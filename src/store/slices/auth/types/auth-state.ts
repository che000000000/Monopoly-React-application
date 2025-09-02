import { IUser } from "../interfaces/user"

export type AuthStateT = {
    isAuth: boolean
    user: IUser | null,
    isAuthLoading: boolean, 
    oauthUrl: string | null
}