import GameBoard from './game-board/GameBoard';
import styles from './game-page.module.css'

function GamePage() {
    return (
        <div className={styles.container}>
            <GameBoard />
        </div>
    )
}

export default GamePage;