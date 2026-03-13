export enum UserRole {
    REGULAR = 'REGULAR',
    ADMIN = 'ADMIN',
    DEV = 'DEV'
}

export interface IUser {
    id: string,
    name: string,
    avatarUrl: string,
    role: UserRole
}