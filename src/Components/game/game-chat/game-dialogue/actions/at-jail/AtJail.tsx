import styles from '../common.module.css'
import { IGamePayment } from '../../../../../../store/interfaces/game-payment';
import { AppDispatch } from '../../../../../../store';
import { useAppDispatch } from '../../../../../../hoocks/useAppDispatch';
import { buyoutFromJail, rollDiceToGetOutOfJail } from '../../../../../../API/ws-thunks/games';

function AtJail(props: { payment: IGamePayment }) {
    const dispatch: AppDispatch = useAppDispatch()
    const { payment } = props

    const handleRollDiceToGetOutOfJail = () => {
        dispatch(rollDiceToGetOutOfJail())
    }

    const handleBuyoutFromJail = () => {
        dispatch(buyoutFromJail())
    }

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Вы оказались заключены в тюрьме. Бросьте кости, чтобы попытаться выбраться, или заплатите M{payment.amount}, чтобы выйти прямо сейчас.
            </div>
            <div className={styles.options}>
                <button className={`${styles.btn} ${styles.btn_green}`} onClick={() => handleRollDiceToGetOutOfJail()}>Бросить кости</button>
                <button
                    className={`${styles.btn} ${styles.btn_red}`}
                    onClick={() => handleBuyoutFromJail()}
                    disabled={payment.amount > payment.payerPlayer.balance}
                >
                    Заплатить
                </button>
            </div>
        </div>
    )
}

export default AtJail;