import { Link } from 'react-router-dom';
import { IGamePreview } from '../../../../store/slices/games/interfaces/game-preview';
import PlayersList from '../players-list/PlayersList';
import styles from './current-game.module.css'

function CurrentGame(props: { game: IGamePreview }) {
    return (
        <Link to={'game'} className={styles.container}>
            <PlayersList players={props.game.players}/>
        </Link>
    )
}

export default CurrentGame;