import { IPlayer } from "./player"

export enum GameFieldType {
    PROPERTY = 'PROPERTY',
    RAILROAD = 'RAILROAD',
    UTILITY = 'UTILITY',
    CHANCE = 'CHANCE',
    COMMUNITY_CHEST = 'COMMUNITY_CHEST',
    TAX = 'TAX',
    JUST_VISITING = 'JUST_VISITING',
    GO_TO_JAIL = 'GO_TO_JAIL',
    FREE_PARKING = 'FREE_PARKING',
    GO = 'GO'
}

export enum GameFieldColor {
    BROWN = '#5a382a',
    WHITE_MOON = '#9cc3e4',
    PURPLE = '#cf2a5bff',
    ORANGE = '#f38823ff',
    RED = '#c02525ff',
    YELLOW = '#ffeb38',
    GREEN = '#1b7928ff',
    BLUE = '#1c42aa'
}

export interface IGameField {
    id: string,
    name: string,
    type: GameFieldType,
    color: GameFieldColor | null,
    position: number,
    players: IPlayer[],
    owner: IPlayer | null
    rent: number[] | null,
    basePrice: number | null,
    housePrice: number | null,
    buildsCount: number | null
}