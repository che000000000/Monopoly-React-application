import styles from './random-event.module.css'
import chance from '../../../icons/chance.svg'
import railway from '../../../icons/railway.svg'
import community_chest from '../../../icons/community-chest.svg'
import tax from '../../../icons/tax.svg'
import utility_electric_station from '../../../icons/utility_electric_station.svg'
import utility_water_works from '../../../icons/utility_water_works.svg'

export enum RandomEvents {
    CHANCE = 'CHANCE',
    COMMUNITY_CHEST = 'COMMUNITY_CHEST',
    RAILROAD = 'RAILROAD',
    TAX = 'TAX',
    UTILITY = 'UTILITY'
}

function RandomEvent(props: { orientation: string, type: RandomEvents, name: string }) {
    const getIcon = (fieldType: RandomEvents, fieldName: string) => {
        switch (fieldType) {
            case RandomEvents.CHANCE:
                return chance;
            case RandomEvents.COMMUNITY_CHEST:
                return community_chest;
            case RandomEvents.RAILROAD:
                return railway;
            case RandomEvents.TAX:
                return tax;
            case RandomEvents.UTILITY:
                return fieldName === 'ЭЛЕКТРИЧЕСТВО'
                    ? utility_electric_station
                    : utility_water_works;
            default:
                return chance;
        }
    }

    switch (props.orientation) {
        case 'top': return (
            <div className={`${styles.container} ${styles.top_container}`}>
                <img className={`${styles.icon}`} alt={props.name} src={getIcon(props.type, props.name)}></img>
                <div className={styles.vertical_field_name}>{props.name}</div>
            </div>
        )
        case 'right': return (
            <div className={`${styles.container} ${styles.right_container}`}>
                <div className={styles.horizontal_field_name}>{props.name}</div>
                <img className={`${styles.icon} ${styles.right_icon}`} alt={props.name} src={getIcon(props.type, props.name)}></img>
            </div>
        )
        case 'bottom': return (
            <div className={`${styles.container} ${styles.bottom_container}`}>
                <img className={styles.icon} alt={props.name} src={getIcon(props.type, props.name)}></img>
                <div className={styles.vertical_field_name}>{props.name}</div>
            </div>
        )
        case 'left': return (
            <div className={`${styles.container} ${styles.left_container}`}>
                <div className={styles.horizontal_field_name}>{props.name}</div>
                <img className={`${styles.icon} ${styles.left_icon}`} alt={props.name} src={getIcon(props.type, props.name)}></img>
            </div>
        )
        default: return (
            <div></div>
        )
    }
}

export default RandomEvent;