import styles from '../../common.module.css'
import { IGamePayment } from '../../../../../../../store/interfaces/game-payment';
import { AppDispatch } from '../../../../../../../store';
import { useAppDispatch } from '../../../../../../../hoocks/useAppDispatch';
import { payThePayment } from '../../../../../../../API/ws-thunks/games';

function PayMoney(props: { payment: IGamePayment }) {
    const dispatch: AppDispatch = useAppDispatch()
    const { payment } = props

    const handlePayMoney = (paymentId: string) => {
        dispatch(payThePayment(paymentId))
    }

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Вам выставлен платеж. Зплатите: M{payment.amount}.
            </div>
            <div className={styles.options}>
                <button
                    className={`${styles.btn} ${styles.btn_green}`}
                    disabled={payment.amount > payment.payerPlayer.balance}
                    onClick={() => handlePayMoney(payment.id)}
                >
                    Заплатить
                </button>
                <button className={`${styles.btn} ${styles.btn_red}`}>Сдаться</button>
            </div>
        </div>
    )
}

export default PayMoney;