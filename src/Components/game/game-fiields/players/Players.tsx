import styles from './players.module.css';
import { definePlayerChipIcon } from '../../../../common/define-player-chip';
import { IPlayer } from '../../../../store/interfaces/player';

export enum GameFieldPlayerOrientation {
    VERTICAL = 'VERTICAL',
    HORIZONTAL = 'HORIZONTAL'
}

function Players(props: { players: IPlayer[] | null, orientation: GameFieldPlayerOrientation }) {
    return (
        <div className={`${styles.container} ${props.orientation === GameFieldPlayerOrientation.VERTICAL
            ? styles.players_area_vertical
            : styles.players_area_horizontal
            }`}>
            {props.players
                ? props.players.map((player: IPlayer) => <img
                    key={player.id}
                    className={props.orientation === GameFieldPlayerOrientation.HORIZONTAL ? styles.player_chip_horizontal : styles.player_chip_vertical}
                    alt={player.user.name}
                    src={definePlayerChipIcon(player.chip)}
                />)
                : null
            }
        </div>
    )
}

export default Players;