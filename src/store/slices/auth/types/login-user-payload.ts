import { UserRole } from "../../../interfaces/user"

export type LoginUserPayloadT = {
    id: string,
    name: string,
    avatarUrl: string,
    role: UserRole
}