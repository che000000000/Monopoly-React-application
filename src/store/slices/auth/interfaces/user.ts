import { UserRole } from "../../../enums/user-role";

export interface IUser {
    id: string,
    name: string,
    avatarUrl: string,
    role: UserRole
}