import { IGameField } from "../../../../store/interfaces/game-field";
import { IPlayer } from "../../../../store/interfaces/player";

export interface MakeMoveMessage {
    player: IPlayer,
    gameFields: IGameField[]
}