import { IGamePreview } from '../../../../store/slices/games/interfaces/game-preview';
import PlayersList from '../players-list/PlayersList';
import styles from './active-game-item.module.css'

function ActiveGameItem(props: { game: IGamePreview }) {
    return (
        <div className={styles.container}>
            <PlayersList players={props.game.players}/>
        </div>
    )
}

export default ActiveGameItem;