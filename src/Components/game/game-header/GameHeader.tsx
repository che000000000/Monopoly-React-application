import styles from './game-header.module.css'
import { IPlayer } from '../../../store/slices/games/interfaces/player';
import TurnTimer from './turn-timer/TurnTimer';
import Player from './player/Player';

function GameHeader(props: { players: IPlayer[] }) {
    return (
        <div className={styles.container}>
            <TurnTimer />
            <ul className={styles.players_list}>
                {props.players
                    .slice()
                    .sort((a, b) => a.turnNumber - b.turnNumber)
                    .map((player: IPlayer) => (
                        <Player key={player.id} player={player} />
                    ))}
            </ul>
        </div>
    )
}

export default GameHeader;