import { useAppSelector } from '../../../hoocks/useAppSelector';
import { GamesStateT } from '../../../store/slices/games/types/games-state';
import styles from './game-dialogue.module.css'
import Move from './actions/move/Move';
import { AuthStateT } from '../../../store/slices/auth/types/auth-state';
import Payment from './actions/payment/Payment';
import { GameTurnStage } from '../../../store/interfaces/game-turn';

function GameDialogue() {
    const authState: AuthStateT = useAppSelector(state => state.auth)
    const gamesState: GamesStateT = useAppSelector(state => state.games)

    const myUserId = authState.user?.id

    return (
        <div className={styles.container}>
            {
                gamesState.currentGame?.turn.stage === GameTurnStage.MOVE && myUserId === gamesState.currentGame.turn.player.user.id
                    ? <Move />
                    : null
            }
            {
                gamesState.currentGame?.turn.gamePayments?.map(p =>
                    p.payerPlayer?.user.id === myUserId
                        ? <Payment key={p.id} {...p} />
                        : null
                )
            }
        </div>
    )

}

export default GameDialogue;