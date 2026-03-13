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
    BROWN = '#831717ff',
    WHITE_MOON = '#c8e0ffff',
    PURPLE = '#cf2a5bff',
    ORANGE = '#f38823ff',
    RED = '#c02525ff',
    YELLOW = '#f0ec14ff',
    GREEN = '#1b7928ff',
    BLUE = '#4b85dbff'
}

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