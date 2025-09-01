import { GameFieldOrientation } from '../enums/game-field-orientation'
import house_icon from '../../../../icons/game-builds/house.svg';
import hotel_icon from '../../../../icons/game-builds/hotel.svg'
import iron_chip from '../../../../images/iron-chip.png'
import hat_chip from '../../../../images/hat-chip.png'
import cart_chip from '../../../../images/cart-chip.png'
import penguin_chip from '../../../../images/penguin-chip.png'
import thimble_chip from '../../../../images/thimble-chip.png'
import styles from './property.module.css'
import { PlayerChip } from '../../../../store/enums/player-chip';
import { IGameField } from '../../../../store/games/interfaces/game-field';

function Property(props: { orientation: GameFieldOrientation, fieldData: IGameField }) {
    const fieldColor = props.fieldData.color ? props.fieldData.color : '#fff'

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
                <div className={styles.top_header} style={{ backgroundColor: fieldColor }}></div>
                <div className={styles.vertical_field_name}>{props.fieldData.name}</div>
                <div className={styles.field_price}>{`M${props.fieldData.basePrice}`}</div>
                <div className={`${styles.dynamic_area} ${styles.top_players_area}`}>
                    {props.fieldData.players
                        ? props.fieldData.players.map(player => <img className={styles.player_chip} alt={player.user.name} src={definePlayerChipIcon(player.chip)} />)
                        : null
                    }
                </div>
                <div className={`${styles.dynamic_area} ${styles.top_builds_area}`}>
                    {props.fieldData.buildsCount === 5
                        ? <img className={styles.field_build} alt='hotel' src={hotel_icon} />
                        : Array.from({ length: props.fieldData.buildsCount ? props.fieldData.buildsCount : 0 }).map(_ =>
                            <img className={styles.field_build} alt='house' src={house_icon} />
                        )
                    }
                </div>
            </div>
        )
        case GameFieldOrientation.RIGHT: return (
            <div className={`${styles.container} ${styles.right_container}`}>
                <div className={styles.field_price}>{`M${props.fieldData.basePrice}`}</div>
                <div className={styles.horizontal_field_name}>{props.fieldData.name}</div>
                <div className={styles.right_header} style={{ backgroundColor: fieldColor }}></div>
                <div className={`${styles.dynamic_area} ${styles.right_players_area}`}>
                    {props.fieldData.players
                        ? props.fieldData.players.map(player => <img className={styles.player_chip} alt={player.user.name} src={definePlayerChipIcon(player.chip)} />)
                        : null
                    }
                </div>
                <div className={`${styles.dynamic_area} ${styles.right_builds_area}`}>
                    {props.fieldData.buildsCount === 5
                        ? <img className={styles.field_build} alt='hotel' src={hotel_icon} />
                        : Array.from({ length: props.fieldData.buildsCount ? props.fieldData.buildsCount : 0 }).map(_ =>
                            <img className={styles.field_build} alt='house' src={house_icon} />
                        )
                    }
                </div>
            </div>
        )
        case GameFieldOrientation.BOTTOM: return (
            <div className={`${styles.container} ${styles.bottom_container}`}>
                <div className={styles.field_price}>{`M${props.fieldData.basePrice}`}</div>
                <div className={styles.vertical_field_name}>{props.fieldData.name}</div>
                <div className={styles.bottom_header} style={{ backgroundColor: fieldColor }}></div>
                <div className={`${styles.dynamic_area} ${styles.bottom_players_area}`}>
                    {props.fieldData.players
                        ? props.fieldData.players.map(player => <img className={styles.player_chip} alt={player.user.name} src={definePlayerChipIcon(player.chip)} />)
                        : null
                    }
                </div>
                <div className={`${styles.dynamic_area} ${styles.bottom_builds_area}`}>
                    {props.fieldData.buildsCount === 5
                        ? <img className={styles.field_build} alt='hotel' src={hotel_icon} />
                        : Array.from({ length: props.fieldData.buildsCount ? props.fieldData.buildsCount : 0 }).map(_ =>
                            <img className={styles.field_build} alt='house' src={house_icon} />
                        )
                    }
                </div>
            </div>
        )
        case GameFieldOrientation.LEFT: return (
            <div className={`${styles.container} ${styles.left_container}`}>
                <div className={styles.left_header} style={{ backgroundColor: fieldColor }}></div>
                <div className={styles.horizontal_field_name}>{props.fieldData.name}</div>
                <div className={styles.field_price}>{`M${props.fieldData.basePrice}`}</div>
                <div className={`${styles.dynamic_area} ${styles.left_players_area}`}>
                    {props.fieldData.players
                        ? props.fieldData.players.map(player => <img className={styles.player_chip} alt={player.user.name} src={definePlayerChipIcon(player.chip)} />)
                        : null
                    }
                </div>
                <div className={`${styles.dynamic_area} ${styles.left_builds_area}`}>
                    {props.fieldData.buildsCount === 5
                        ? <img className={styles.field_build} alt='hotel' src={hotel_icon} />
                        : Array.from({ length: props.fieldData.buildsCount ? props.fieldData.buildsCount : 0 }).map(_ =>
                            <img className={styles.field_build} alt='house' src={house_icon} />
                        )
                    }
                </div>
            </div>
        )
        default: return null
    }
}

export default Property;