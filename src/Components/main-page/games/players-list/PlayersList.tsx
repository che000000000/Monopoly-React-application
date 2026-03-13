import { IPlayerPreview } from '../../../../store/interfaces/player-prewiew';
import PlayerItem from '../player-item/PlayerItem'
import styles from './players-list.module.css'

function PlayersList(props: { players: IPlayerPreview[] }) {
    return (
        <div className={styles.container}>
            {props.players.map((player: IPlayerPreview) => <PlayerItem key={player.id} player={player} />)}
        </div>
    )
}

export default PlayersList;