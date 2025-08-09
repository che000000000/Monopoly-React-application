import styles from './in-game-player.module.css'
import iron_chip from '../../../images/iron-chip.png'
import hat_chip from '../../../images/hat-chip.png'
import cart_chip from '../../../images/cart-chip.png'
import penguin_chip from '../../../images/penguin-chip.png'
import thimble_chip from '../../../images/thimble-chip.png'
import { PlayerChip } from '../../../store/enums/player-chip'

export enum PlayerStatus {
    COMMON,
    IS_TURN_OWNER,
    IS_LEFT
}

function InGamePlayer(props: { name: string, avatarUrl: string, playerChip: PlayerChip, status?: PlayerStatus }) {
    const definePlayerChip = (playerChip: PlayerChip): string => {
        switch (playerChip) {
            case PlayerChip.CART: return cart_chip
            case PlayerChip.HAT: return hat_chip
            case PlayerChip.IRON: return iron_chip
            case PlayerChip.PENGUIN: return penguin_chip
            case PlayerChip.THIMBLE: return thimble_chip
        }
    }

    return (
        <li className={
            `${styles.container} 
            ${props.status === PlayerStatus.IS_TURN_OWNER ? styles.is_turn_owner_container : ''}
            ${props.status === PlayerStatus.IS_LEFT ? styles.left_player_container : ''}
            `}>
            <div className={styles.name}>{props.name}</div>
            {/* <img className={styles.avatar} alt={props.name} src={props.avatarUrl} /> */}
            <img className={styles.figurine} alt={props.name} src={definePlayerChip(props.playerChip)} />
        </li>
    )
}

export default InGamePlayer;