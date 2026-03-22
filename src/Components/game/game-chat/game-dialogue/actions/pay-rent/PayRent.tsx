import { payRent } from '../../../../../../API/ws-thunks/games';
import { definePlayerChipIcon } from '../../../../../../common/define-player-chip';
import { useAppDispatch } from '../../../../../../hoocks/useAppDispatch';
import { AppDispatch } from '../../../../../../store';
import { IGameField } from '../../../../../../store/interfaces/game-field';
import { IGamePayment } from '../../../../../../store/interfaces/game-payment';
import styles from '../common.module.css'

function PayRent(props: { field: IGameField, payment: IGamePayment }) {
    const dispatch: AppDispatch = useAppDispatch()
    const { field, payment } = props
    const receiverPlayerChip = payment.receiverPaymentPlayer?.chip

    const handlePayRent = () => {
        dispatch(payRent())
    }

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Вы попали на собственность "{field.name}", которым владет игрок{' '}
                <span className={styles.player_presentation}>
                    {field.owner?.user.name}{receiverPlayerChip
                        ? <img className={styles.player_chip} src={definePlayerChipIcon(receiverPlayerChip)} alt='player-chip' />
                        : null}
                </span>
                . Заплатите ренту в размере M{payment.amount}.
            </div>
            <div className={styles.options}>
                <button
                    className={`${styles.btn} ${styles.btn_green}`}
                    disabled={payment.amount > payment.payerPlayer.balance}
                    onClick={() => handlePayRent()}
                >
                    Заплатить
                </button>
                <button className={`${styles.btn} ${styles.btn_red}`}>Сдаться</button>
            </div>
        </div>
    )
}

export default PayRent;