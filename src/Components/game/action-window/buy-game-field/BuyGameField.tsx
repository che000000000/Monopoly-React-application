import { buyGameField } from '../../../../API/ws-thunks/games';
import { useAppDispatch } from '../../../../hoocks/useAppDispatch';
import styles from './buy-game-field.module.css'

function BuyGameField(props: { setIsShowWindow: (value: boolean) => void }) {
    const dispatch = useAppDispatch()

    const handleBuyGameField = () => {
        dispatch(buyGameField())
        props.setIsShowWindow(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.text}>У вас есть возможность купить поле.</div>
            <div className={styles.options}>
                <button className={`${styles.action_btn} ${styles.buy_btn}`} onClick={() => handleBuyGameField()}>Купить</button>
                <button className={`${styles.action_btn} ${styles.not_buy_btn}`}>Не покупать</button>
            </div>
        </div>
    )
}

export default BuyGameField;