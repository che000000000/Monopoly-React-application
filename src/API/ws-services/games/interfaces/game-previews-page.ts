import { IGamePreview } from "../../../../store/interfaces/game-preview";

export interface GamePrewiewsPageMessage {
    gamePreviewsList: IGamePreview[],
    totalCount: number
}