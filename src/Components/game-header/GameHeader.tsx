import { PlayerChip } from '../../store/enums/player-chip';
import { PlayerT } from '../../types/games';
import InGamePlayer, { PlayerStatus } from '../player/in-game-player/InGamePlayer';
import styles from './game-header.module.css'

function GameHeader(props: {players: PlayerT[]}) {
    return (
        <div className={styles.container}>
            <div className={styles.turn_timer}>
                <div className={styles.turn_timer__text}>ТАЙМЕР ХОДА</div>
                <div className={styles.timer}>00 : 60</div>
            </div>
            <ul className={styles.players_list}>
                {props.players.map(player => (
                    <InGamePlayer
                        name={player.name}
                        avatarUrl={player.avatarUrl}
                        playerChip={player.chip}
                    />
                ))}
            </ul>
        </div>
    )
}

export default GameHeader;