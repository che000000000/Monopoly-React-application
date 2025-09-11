import styles from './players.module.css';
import general from '../general.module.css'
import { IPlayer } from '../../../../store/slices/games/interfaces/player';
import { definePlayerChipIcon } from '../../../../common/define-player-chip';

export enum GameFieldPlayerOrientation {
    VERTICAL = 'VERTICAL',
    HORIZONTAL = 'HORIZONTAL'
}

function Players(props: { players: IPlayer[] | null, orientation: GameFieldPlayerOrientation }) {
    return (
        <div className={`${general.dynamic_area} ${props.orientation === GameFieldPlayerOrientation.VERTICAL
            ? styles.players_area_vertical
            : styles.players_area_horizontal
            }`}>
            {props.players
                ? props.players.map((player: IPlayer) => <img
                    key={player.id}
                    className={styles.player_chip}
                    alt={player.user.name}
                    src={definePlayerChipIcon(player.chip)}
                />)
                : null
            }
        </div>
    )
}

export default Players;