export enum ActionCardDeckType {
    CHANCE = 'CHANCE',
    COMMUNITY_CHEST = 'COMMUNITY_CHEST'
}

export enum ActionCardType {
    MOVE = 'MOVE',
    GO_TO_JAIL = 'GO_TO_JAIL',
    GET_MONEY = 'GET_MONEY',
    PAY_MONEY = 'PAY_MONEY',
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