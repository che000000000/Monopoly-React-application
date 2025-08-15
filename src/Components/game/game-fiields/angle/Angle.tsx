import styles from './angle.module.css'
import go_arrow from '../../../../icons/field-icons/go_arrow.svg'
import just_visiting from '../../../../icons/field-icons/just_visiting.svg'
import free_parking from '../../../../icons/field-icons/free_parking.svg'
import jail from '../../../../icons/field-icons/jail.svg'
import iron_chip from '../../../../images/iron-chip.png'
import hat_chip from '../../../../images/hat-chip.png'
import cart_chip from '../../../../images/cart-chip.png'
import penguin_chip from '../../../../images/penguin-chip.png'
import thimble_chip from '../../../../images/thimble-chip.png'
import { GameFieldType } from '../../../../store/enums/game-field-type'
import { PlayerChip } from '../../../../store/enums/player-chip'
import { GameFieldT } from '../../../../store/types/games'

function Angle(props: GameFieldT) {

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

    switch (props.type) {
        case GameFieldType.GO: return (
            <div className={styles.container}>
                <div className={styles.go_description}>ПОЛУЧИТЕ ЗАРПЛАТУ M200. КОГДА ВЫ ПРОХОДИТЕ ЭТО ПОЛЕ.</div>
                <div className={styles.go_name}>ВПЕРЕД</div>
                <img className={styles.go_icon} alt='go' src={go_arrow}></img>
                <div className={`${styles.dynamic_area}`}>
                    { props.players 
                        ? props.players.map(player => <img className={styles.player_chip} alt={props.name} src={definePlayerChipIcon(player.chip)}/>)
                        : null
                    }
                </div>
            </div>
        )
        case GameFieldType.JUST_VISITING: return (
            <div className={styles.container}>
                <div className={styles.name}>ПРОСТО</div>
                <img className={styles.icon} alt='just-visiting' src={just_visiting}></img>
                <div className={styles.name}>ПОСЕТИЛИ</div>
                <div className={`${styles.dynamic_area}`}>
                    { props.players 
                        ? props.players.map(player => <img className={styles.player_chip} alt={props.name} src={definePlayerChipIcon(player.chip)}/>)
                        : null
                    }
                </div>
            </div>
        )
        case GameFieldType.FREE_PARKING: return (
            <div className={styles.container}>
                <div className={styles.name}>БЕСПЛАТНАЯ</div>
                <img className={styles.icon} alt='free-parking' src={free_parking}></img>
                <div className={styles.name}>ПАРКОВКА</div>
                <div className={`${styles.dynamic_area}`}>
                    { props.players 
                        ? props.players.map(player => <img className={styles.player_chip} alt={props.name} src={definePlayerChipIcon(player.chip)}/>)
                        : null
                    }
                </div>
            </div>
        )
        case GameFieldType.GO_TO_JAIL: return (
            <div className={styles.container}>
                <div className={styles.name}>ОТПРАВЛЯЙТЕСЬ</div>
                <img className={styles.icon} alt='jail' src={jail}></img>
                <div className={styles.name}>В ТЮРЬМУ</div>
                <div className={`${styles.dynamic_area}`}>
                    { props.players 
                        ? props.players.map(player => <img className={styles.player_chip} alt={props.name} src={definePlayerChipIcon(player.chip)}/>)
                        : null
                    }
                </div>
            </div>
        )
        default: return null
    }
}

export default Angle;