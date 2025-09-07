import { useAppSelector } from '../../../hoocks/useAppSelector';
import { GameTurnStage } from '../../../store/enums/game-turn-stage';
import { AuthStateT } from '../../../store/slices/auth/types/auth-state';
import { GamesStateT } from '../../../store/slices/games/types/games-state';
import styles from './action-window.module.css'
import BuyGameFieldAction from './buy-game-field-action/BuyGameFieldAction';
import MakeMove from './throw-dices-action/MakeMove';

function ActionWindow() {
    const authState: AuthStateT = useAppSelector(state => state.auth)
    const gamesState: GamesStateT = useAppSelector(state => state.games)

    if (gamesState.currentGame?.turn.player.user.id !== authState.user?.id) {
        return null
    }

    return (
        <div className={styles.container}>
            {gamesState.currentGame?.turn.stage === GameTurnStage.MOVE
                ? <MakeMove />
                : <BuyGameFieldAction />}
        </div>
    )
}

export default ActionWindow;