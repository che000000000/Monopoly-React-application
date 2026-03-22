import styles from '../common.module.css'
import { IGamePayment } from '../../../../../../store/interfaces/game-payment';
import { AppDispatch } from '../../../../../../store';
import { useAppDispatch } from '../../../../../../hoocks/useAppDispatch';
import { buyoutFromJail } from '../../../../../../API/ws-thunks/games';

function BuyoutFromJail(props: { payment: IGamePayment }) {
    const dispatch: AppDispatch = useAppDispatch()
    const { payment } = props

    const handleBuyoutFromJail = () => {
        dispatch(buyoutFromJail())
    }

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Похоже вам не удалось выбраться из тюрьмы. Вам придётся заплатить M{payment.amount}, чтобы вас освободили.
            </div>
            <div className={styles.options}>
                <button
                    className={`${styles.btn} ${styles.btn_green}`}
                    onClick={() => handleBuyoutFromJail()}
                    disabled={payment.amount > payment.payerPlayer.balance}
                >
                    Заплатить
                </button>
                <button className={`${styles.btn} ${styles.btn_red}`}>Сдаться</button>
            </div>
        </div>
    )
}

export default BuyoutFromJail;