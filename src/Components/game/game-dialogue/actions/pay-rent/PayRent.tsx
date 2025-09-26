import { useAppSelector } from '../../../../../hoocks/useAppSelector';
import { GamesStateT } from '../../../../../store/slices/games/types/games-state';
import styles from './pay-rent.module.css';
import general from '../general.module.css';
import { useAppDispatch } from '../../../../../hoocks/useAppDispatch';
import { payRent } from '../../../../../API/ws-thunks/games';
import { AppDispatch } from '../../../../../store';

function PayRent() {
    const gameState: GamesStateT = useAppSelector(state => state.games)
    const dispatch: AppDispatch = useAppDispatch()

    const handlePayRent = () => {
        dispatch(payRent())
    }

    return (
        <div className={general.container}>
            {
                gameState.currentGame?.turn.gamePayment
                && <div className={styles.text}>{`Вы должны заплатить ренту, в размере: M${gameState.currentGame.turn.gamePayment.amount}`}</div>
            }
            <div className={general.options}>
                <button className={`${general.btn} ${general.btn_green}`} onClick={() => handlePayRent()}>Заплатить</button>
                <button className={`${general.btn} ${general.btn_red}`}>Сдаться</button>
            </div>
        </div>
    )
}

export default PayRent;