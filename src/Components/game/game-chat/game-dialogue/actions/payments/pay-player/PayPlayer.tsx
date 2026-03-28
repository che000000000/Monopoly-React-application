import styles from '../../common.module.css'
import { IGamePayment } from '../../../../../../../store/interfaces/game-payment';
import { definePlayerChipIcon } from '../../../../../../../common/define-player-chip';
import { useAppDispatch } from '../../../../../../../hoocks/useAppDispatch';
import { AppDispatch } from '../../../../../../../store';
import { payThePayment } from '../../../../../../../API/ws-thunks/games';

function PayPlayer(props: { payment: IGamePayment }) {
    const dispatch: AppDispatch = useAppDispatch()
    const { payment } = props

    const handlePayPlayer = (paymentId: string) => {
        dispatch(payThePayment(paymentId))
    }

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Вы должны заплатить M{payment.amount}, игроку: {' '}
                <span className={styles.player_presentation}>
                    {payment.receiverPaymentPlayer?.user.name}{payment.receiverPaymentPlayer?.chip
                        ? <img className={styles.player_chip} src={definePlayerChipIcon(payment.receiverPaymentPlayer.chip)} alt='player-chip' />
                        : null}
                </span>
            </div>
            <div className={styles.options}>
                <button
                    className={`${styles.btn} ${styles.btn_green}`}
                    disabled={payment.amount > payment.payerPlayer.balance}
                    onClick={() => handlePayPlayer(payment.id)}
                >
                    Заплатить
                </button>
                <button className={`${styles.btn} ${styles.btn_red}`}>Сдаться</button>
            </div>
        </div>
    )
}

export default PayPlayer;