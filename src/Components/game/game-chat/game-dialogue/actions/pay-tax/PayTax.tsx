import { payTax } from '../../../../../../API/ws-thunks/games';
import { useAppDispatch } from '../../../../../../hoocks/useAppDispatch';
import { AppDispatch } from '../../../../../../store';
import { IGameField } from '../../../../../../store/interfaces/game-field';
import { IGamePayment } from '../../../../../../store/interfaces/game-payment';
import styles from '../common.module.css'

function PayTax(props: { field: IGameField, payment: IGamePayment }) {
    const dispatch: AppDispatch = useAppDispatch()
    const { field, payment } = props

    const handlePayTax = () => {
        dispatch(payTax())
    }

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Вы попали на поле "{field.name}" и должны заплатить налог, в размере M{payment.amount}.
            </div>
            <div className={styles.options}>
                <button className={`${styles.btn} ${styles.btn_green}`} onClick={() => handlePayTax()}>Заплатить</button>
                <button className={`${styles.btn} ${styles.btn_red}`}>Сдаться</button>
            </div>
        </div>
    )
}

export default PayTax;