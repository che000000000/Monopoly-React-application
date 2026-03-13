export enum ActionCardDeckType {
    CHANCE = 'CHANCE',
    COMMUNITY_CHEST = 'COMMUNITY_CHEST'
}

export enum ActionCardType {
    MOVE = 'MOVE',
    MOVE_BACK = 'MOVE_BACK',
    PAY_MONEY = 'PAY_MONEY',
    GET_MONEY = 'GET_MONEY',
    PAY_PLAYERS = 'PAY_PLAYERS',
    GET_PAYMENT_FROM_PLAYERS = 'GET_PAYMENT_FROM_PLAYERS',
    GET_OUT_OF_JAIL = 'GET_OUT_OF_JAIL',
    PROPERTY_REPAIR = 'PROPERTY_REPAIR'
}

export interface IActionCard {
    id: string,
    description: string,
    deckType: ActionCardDeckType,
    type: ActionCardType
}