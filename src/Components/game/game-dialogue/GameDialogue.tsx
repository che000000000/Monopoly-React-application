import { useAppSelector } from '../../../hoocks/useAppSelector';
import { GamesStateT } from '../../../store/slices/games/types/games-state';
import BuyGameField from './actions/buy-game-field/BuyGameField';
import styles from './game-dialogue.module.css'
import MakeMove from './actions/make-move/MakeMove';
import { GameTurnStage } from '../../../store/enums/game-turn-stage';
import PayRent from './actions/pay-rent/PayRent';
import { AuthStateT } from '../../../store/slices/auth/types/auth-state';
import PayTax from './actions/pay-tax/PayTax';

function GameDialogue() {
    const authState: AuthStateT = useAppSelector(state => state.auth)
    const gamesState: GamesStateT = useAppSelector(state => state.games)

    if (gamesState.currentGame?.turn.player.user.id !== authState.user?.id) {
        return null
    }

    switch (gamesState.currentGame?.turn.stage) {
        case GameTurnStage.MOVE: return (
            <div className={`${styles.container}`}>
                <MakeMove />
            </div>
        )
        case GameTurnStage.BUY_GAME_FIELD: return (
            <div className={`${styles.container}`}>
                <BuyGameField />
            </div>
        )
        case GameTurnStage.PAY_RENT: return (
            <div className={`${styles.container}`}>
                <PayRent />
            </div>
        )
        case GameTurnStage.PAY_TAX: return (
            <div className={`${styles.container}`}>
                <PayTax />
            </div>
        )
        default: return null
    }
}

export default GameDialogue;