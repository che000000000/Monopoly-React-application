import styles from './player.module.css'
import { PlayerStatus } from '../../../../store/enums/player-status'
import { AuthStateT } from '../../../../store/slices/auth/types/auth-state'
import { useAppSelector } from '../../../../hoocks/useAppSelector'
import { IPlayer } from '../../../../store/slices/games/interfaces/player'
import { GamesStateT } from '../../../../store/slices/games/types/games-state'
import { definePlayerChipIcon } from '../../../../common/define-player-chip'

function Player(props: { player: IPlayer }) {
    const authState: AuthStateT = useAppSelector(state => state.auth)
    const gamesState: GamesStateT = useAppSelector(state => state.games)

    return (
        <li className={`${styles.container} 
            ${props.player.status === PlayerStatus.IS_LEFT ? styles.left_player_container : ''}
            ${props.player.id === gamesState.currentGame?.turn.player.id ? styles.is_turn_owner_container : ''}
            `}>
            <div className={styles.name}>{props.player.user.id === authState.user?.id ? 'Вы' : props.player.user.name}</div>
            <img className={styles.figurine} alt={`${props.player.user.name}-chip`} src={definePlayerChipIcon(props.player.chip)} />
            <div className={styles.balance}>{`M${props.player.balance}`}</div>
        </li>
    )
}

export default Player;