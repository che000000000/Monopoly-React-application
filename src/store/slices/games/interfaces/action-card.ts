export enum ActionCardDeckType {
    CHANCE = 'CHANCE',
    COMMUNITY_CHEST = 'COMMUNITY_CHEST'
}

export enum ActionCardType {
    MOVE = 'MOVE',
    MONEY = 'MONEY',
    PAY_PLAYERS = 'PAY_PLAYERS',
    JAIL = 'JAIL',
    GET_OUT_OF_JAIL = 'GET_OUT_OF_JAIL',
    UTILITY = 'UTILITY',
    RAILROAD = 'RAILROAD',
    PROPERTY_REPAIR = 'PROPERTY_REPAIR',
    MOVE_BACK = 'MOVE_BACK'
}

export interface IActionCard {
    id: string,
    description: string,
    deckType: ActionCardDeckType,
    type: ActionCardType
}