import { IPlayerPreview } from "./player-prewiew";

export interface IGamePreview {
    id: string,
    players: IPlayerPreview[],
    createdAt: string
}