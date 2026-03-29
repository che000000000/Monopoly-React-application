import styles from './player.module.css';
import { definePlayerChipIcon } from '../../../../../common/define-player-chip';
import { useAppSelector } from '../../../../../hoocks/useAppSelector';
import { AuthStateT } from '../../../../../store/slices/auth/types/auth-state';
import { GamesStateT } from '../../../../../store/slices/games/types/games-state';
import { IPlayer } from '../../../../../store/interfaces/player';

function Player(props: { player: IPlayer }) {
    const authState: AuthStateT = useAppSelector(state => state.auth)
    const gamesState: GamesStateT = useAppSelector(state => state.games)

    return (
        <li className={`${styles.container} 
            ${props.player.isActive === false ? styles.left_player_container : ''}
            ${props.player.id === gamesState.currentGame?.turn.player.id ? styles.is_turn_owner_container : ''}
            `}>
            <div className={styles.name}>{props.player.user.id === authState.user?.id ? 'Вы' : props.player.user.name}</div>
            <img className={styles.figurine} alt={`${props.player.user.name}-chip`} src={definePlayerChipIcon(props.player.chip)} />
            <div className={styles.balance}>{`M${props.player.balance}`}</div>
        </li>
    )
}

export default Player;