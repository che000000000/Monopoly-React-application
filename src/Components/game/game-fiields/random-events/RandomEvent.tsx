import styles from './random-event.module.css'
import chance from '../../../../icons/field-icons/chance.svg'
import railway from '../../../../icons/field-icons/railway.svg'
import community_chest from '../../../../icons/field-icons/community-chest.svg'
import tax from '../../../../icons/field-icons/tax.svg'
import utility_electric_station from '../../../../icons/field-icons/utility_electric_station.svg'
import utility_water_works from '../../../../icons/field-icons/utility_water_works.svg'
import iron_chip from '../../../../images/iron-chip.png'
import hat_chip from '../../../../images/hat-chip.png'
import cart_chip from '../../../../images/cart-chip.png'
import penguin_chip from '../../../../images/penguin-chip.png'
import thimble_chip from '../../../../images/thimble-chip.png'
import { GameFieldType } from '../../../../store/enums/game-field-type'
import { GameFieldOrientation } from '../enums/game-field-orientation'
import { PlayerChip } from '../../../../store/enums/player-chip'
import { IGameField } from '../../../../store/slices/games/interfaces/game-field'

function RandomEvent(props: { orientation: GameFieldOrientation, fieldData: IGameField }) {
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

    function definePlayerChipIcon(playerChip: PlayerChip): string {
        switch (playerChip) {
            case PlayerChip.CART: return cart_chip
            case PlayerChip.HAT: return hat_chip
            case PlayerChip.IRON: return iron_chip
            case PlayerChip.PENGUIN: return penguin_chip
            case PlayerChip.THIMBLE: return thimble_chip
            default: return ''
        }
    }


    switch (props.orientation) {
        case GameFieldOrientation.TOP: return (
            <div className={`${styles.container} ${styles.top_container}`}>
                <img className={`${styles.icon}`} alt={props.fieldData.name} src={getIcon(props.fieldData.type, props.fieldData.name)}></img>
                <div className={styles.vertical_field_name}>{props.fieldData.name}</div>
                <div className={`${styles.dynamic_area} ${styles.top_players_area}`}>
                    {props.fieldData.players
                        ? props.fieldData.players.map(player => <img className={styles.player_chip} alt={player.user.name} src={definePlayerChipIcon(player.chip)} />)
                        : null
                    }
                </div>
            </div>
        )
        case GameFieldOrientation.RIGHT: return (
            <div className={`${styles.container} ${styles.right_container}`}>
                <div className={styles.horizontal_field_name}>{props.fieldData.name}</div>
                <img className={`${styles.icon} ${styles.right_icon}`} alt={props.fieldData.name} src={getIcon(props.fieldData.type, props.fieldData.name)}></img>
                <div className={`${styles.dynamic_area} ${styles.right_players_area}`}>
                    {props.fieldData.players
                        ? props.fieldData.players.map(player => <img className={styles.player_chip} alt={player.user.name} src={definePlayerChipIcon(player.chip)} />)
                        : null
                    }
                </div>
            </div>
        )
        case GameFieldOrientation.BOTTOM: return (
            <div className={`${styles.container} ${styles.bottom_container}`}>
                <img className={styles.icon} alt={props.fieldData.name} src={getIcon(props.fieldData.type, props.fieldData.name)}></img>
                <div className={styles.vertical_field_name}>{props.fieldData.name}</div>
                <div className={`${styles.dynamic_area} ${styles.bottom_players_area}`}>
                    {props.fieldData.players
                        ? props.fieldData.players.map(player => <img className={styles.player_chip} alt={player.user.name} src={definePlayerChipIcon(player.chip)} />)
                        : null
                    }
                </div>
            </div>
        )
        case GameFieldOrientation.LEFT: return (
            <div className={`${styles.container} ${styles.left_container}`}>
                <div className={styles.horizontal_field_name}>{props.fieldData.name}</div>
                <img className={`${styles.icon} ${styles.left_icon}`} alt={props.fieldData.name} src={getIcon(props.fieldData.type, props.fieldData.name)}></img>
                <div className={`${styles.dynamic_area} ${styles.left_players_area}`}>
                    {props.fieldData.players
                        ? props.fieldData.players.map(player => <img className={styles.player_chip} alt={player.user.name} src={definePlayerChipIcon(player.chip)} />)
                        : null
                    }
                </div>
            </div>
        )
        default: return null
    }
}

export default RandomEvent;