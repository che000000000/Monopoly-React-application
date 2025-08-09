import styles from './random-event.module.css'
import chance from '../../../icons/field-icons/chance.svg'
import railway from '../../../icons/field-icons/railway.svg'
import community_chest from '../../../icons/field-icons/community-chest.svg'
import tax from '../../../icons/field-icons/tax.svg'
import utility_electric_station from '../../../icons/field-icons/utility_electric_station.svg'
import utility_water_works from '../../../icons/field-icons/utility_water_works.svg'
import { GameFieldType } from '../../../store/enums/game-field-type'
import { GameFieldOrientation } from '../enums/game-field-orientation'
import { GameFieldT } from '../../../types/games'

function RandomEvent(props: {orientation: GameFieldOrientation, fieldData: GameFieldT}) {
    const getIcon = (fieldType: GameFieldType, fieldName: string) => {
        switch (fieldType) {
            case GameFieldType.CHANCE:
                return chance;
            case GameFieldType.COMMUNITY_CHEST:
                return community_chest;
            case GameFieldType.RAILROAD:
                return railway;
            case GameFieldType.TAX:
                return tax;
            case GameFieldType.UTILITY:
                return fieldName === 'Мосэнерго'
                    ? utility_electric_station
                    : utility_water_works;
            default:
                return chance;
        }
    }

    switch (props.orientation) {
        case GameFieldOrientation.TOP: return (
            <div className={`${styles.container} ${styles.top_container}`}>
                <img className={`${styles.icon}`} alt={props.fieldData.name} src={getIcon(props.fieldData.type, props.fieldData.name)}></img>
                <div className={styles.vertical_field_name}>{props.fieldData.name}</div>
            </div>
        )
        case GameFieldOrientation.RIGHT: return (
            <div className={`${styles.container} ${styles.right_container}`}>
                <div className={styles.horizontal_field_name}>{props.fieldData.name}</div>
                <img className={`${styles.icon} ${styles.right_icon}`} alt={props.fieldData.name} src={getIcon(props.fieldData.type, props.fieldData.name)}></img>
            </div>
        )
        case GameFieldOrientation.BOTTOM: return (
            <div className={`${styles.container} ${styles.bottom_container}`}>
                <img className={styles.icon} alt={props.fieldData.name} src={getIcon(props.fieldData.type, props.fieldData.name)}></img>
                <div className={styles.vertical_field_name}>{props.fieldData.name}</div>
            </div>
        )
        case GameFieldOrientation.LEFT: return (
            <div className={`${styles.container} ${styles.left_container}`}>
                <div className={styles.horizontal_field_name}>{props.fieldData.name}</div>
                <img className={`${styles.icon} ${styles.left_icon}`} alt={props.fieldData.name} src={getIcon(props.fieldData.type, props.fieldData.name)}></img>
            </div>
        )
        default: return (
            <div></div>
        )
    }
}

export default RandomEvent;