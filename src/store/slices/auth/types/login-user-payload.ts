import { UserRole } from "../../../enums/user-role"

export type LoginUserPayloadT = {
    id: string,
    name: string,
    avatarUrl: string,
    role: UserRole
}