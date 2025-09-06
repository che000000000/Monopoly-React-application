import { IGamePreview } from '../../../../store/slices/games/interfaces/game-preview';
import ActiveGameItem from '../active-game-item/ActiveGameItem';
import styles from './active-games.module.css'

function ActiveGames(props: {games: IGamePreview[]}) {
    return (
        <div className={styles.container}>
            {props.games.map((game: IGamePreview) => <ActiveGameItem key={game.id} game={game} />)}
        </div>
    )
}

export default ActiveGames;