import { UserRole } from "../../store/enums/user-role"

export interface ILoginReqBody {
    email: string,
    password: string
}

export interface ILoginResData {
    id: string,
    name: string,
    avatarUrl: string,
    role: UserRole
}

export interface IRegisterReqBody {
    email: string,
    password: string,
    repeatPassword: string
}