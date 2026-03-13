import { Link } from 'react-router-dom';
import PlayersList from '../players-list/PlayersList';
import styles from './current-game.module.css'
import { IGamePreview } from '../../../../store/interfaces/game-preview';

function CurrentGame(props: { game: IGamePreview }) {
    return (
        <Link to={'game'} className={styles.container}>
            <PlayersList players={props.game.players}/>
        </Link>
    )
}

export default CurrentGame;