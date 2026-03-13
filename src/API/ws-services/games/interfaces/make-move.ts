import { IGameField } from "../../../../store/interfaces/game-field";
import { IPlayer } from "../../../../store/interfaces/player";

export interface MakeMoveMessage {
    player: IPlayer,
    newGameField: IGameField,
    leftGameField: IGameField,
    thrownDices: {
        dices: number[],
        summ: number,
        isDouble: boolean
    }
}