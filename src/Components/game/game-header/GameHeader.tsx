import { IPlayer } from '../../../store/slices/games/interfaces/player';
import InGamePlayer from '../../player/in-game-player/InGamePlayer';
import styles from './game-header.module.css'
import TurnTimer from './turn-timer/TurnTimer';

function GameHeader(props: { players: IPlayer[] }) {
    return (
        <div className={styles.container}>
            <TurnTimer />
            <ul className={styles.players_list}>
                {props.players
                    .slice()
                    .sort((a, b) => a.turnNumber - b.turnNumber)
                    .map(player => (
                        <InGamePlayer key={player.id} player={player}
                        />
                    ))}
            </ul>
        </div>
    )
}

export default GameHeader;