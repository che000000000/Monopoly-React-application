import { GameFieldType } from "../../../../../store/enums/game-field-type";
import chance from '../../../../../icons/field-icons/chance.svg'
import railway from '../../../../../icons/field-icons/railway.svg'
import community_chest from '../../../../../icons/field-icons/community-chest.svg'
import luxury_tax from '../../../../../icons/field-icons/luxury_tax.svg'
import income_tax from '../../../../../icons/field-icons/icome_tax.svg'
import utility_electric_station from '../../../../../icons/field-icons/utility_electric_station.svg'
import utility_water_works from '../../../../../icons/field-icons/utility_water_works.svg'

export const defineGameFieldIcon = (fieldType: GameFieldType, fieldName: string) => {
    switch (fieldType) {
        case GameFieldType.CHANCE:
            return chance;
        case GameFieldType.COMMUNITY_CHEST:
            return community_chest;
        case GameFieldType.RAILROAD:
            return railway;
        case GameFieldType.TAX:
            return fieldName === 'Подоходный налог'
                ? income_tax
                : luxury_tax
        case GameFieldType.UTILITY:
            return fieldName === 'Мосэнерго'
                ? utility_electric_station
                : utility_water_works;
        default:
            return chance;
    }
}