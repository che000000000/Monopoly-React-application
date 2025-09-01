import { GameFieldColor } from "../../enums/game-field-color"
import { GameFieldType } from "../../enums/game-field-type"
import { IPlayer } from "./player"

export interface IGameField {
    id: string,
    name: string,
    type: GameFieldType,
    color: GameFieldColor | null,
    position: number,
    players: IPlayer[] | null,
    owner: IPlayer | null
    rent: number[] | null,
    basePrice: number | null,
    housePrice: number | null,
    buildsCount: number | null
}