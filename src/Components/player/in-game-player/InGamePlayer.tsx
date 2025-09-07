import styles from './in-game-player.module.css'
import iron_chip from '../../../images/iron-chip.png'
import hat_chip from '../../../images/hat-chip.png'
import cart_chip from '../../../images/cart-chip.png'
import penguin_chip from '../../../images/penguin-chip.png'
import thimble_chip from '../../../images/thimble-chip.png'
import { PlayerChip } from '../../../store/enums/player-chip'
import { PlayerStatus } from '../../../store/enums/player-status'
import { AuthStateT } from '../../../store/slices/auth/types/auth-state'
import { useAppSelector } from '../../../hoocks/useAppSelector'
import { IPlayer } from '../../../store/slices/games/interfaces/player'
import { GamesStateT } from '../../../store/slices/games/types/games-state'

function InGamePlayer(props: { player: IPlayer }) {
    const authState: AuthStateT = useAppSelector(state => state.auth)
    const gamesState: GamesStateT = useAppSelector(state => state.games)

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
        <li className={`${styles.container} 
            ${props.player.status === PlayerStatus.IS_LEFT ? styles.left_player_container : ''}
            ${props.player.id === gamesState.currentGame?.turn.player.id ? styles.is_turn_owner_container : ''}
            `}>
            <div className={styles.name}>{props.player.user.id === authState.user?.id ? 'Вы' : props.player.user.name}</div>
            <img className={styles.figurine} alt={`${props.player.user.name}-chip`} src={definePlayerChip(props.player.chip)} />
        </li>
    )
}

export default InGamePlayer;