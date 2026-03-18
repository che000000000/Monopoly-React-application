import { buyGameField } from '../../../../../../API/ws-thunks/games';
import { useAppDispatch } from '../../../../../../hoocks/useAppDispatch';
import { AppDispatch } from '../../../../../../store';
import { IGameField } from '../../../../../../store/interfaces/game-field';
import { IGamePayment } from '../../../../../../store/interfaces/game-payment';
import styles from '../common.module.css'

function BuyGameField(props: { field: IGameField, payment: IGamePayment }) {
    const dispatch: AppDispatch = useAppDispatch()
    const { field, payment } = props

    const handleBuyGameField = () => {
        dispatch(buyGameField())
    }

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                У вас есть возможность приобрести собственность "{field.name}". Заплатите M{payment.amount} или эта собственность будет выставлена на аукцион.
            </div>
            <div className={styles.options}>
                <button className={`${styles.btn} ${styles.btn_green}`} onClick={() => handleBuyGameField()}>Выкупить</button>
                <button className={`${styles.btn} ${styles.btn_red}`}>На аукцион</button>
            </div>
        </div>
    )
}

export default BuyGameField;