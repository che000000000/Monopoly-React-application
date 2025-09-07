import styles from './buy-game-field-action.module.css'

function BuyGameFieldAction() {
    return (
        <div className={styles.container}>
            <div className={styles.text}>У вас есть возможность купить поле.</div>
            <div className={styles.options}>
                <button className={`${styles.action_btn} ${styles.buy_btn}`}>Купить</button>
                <button className={`${styles.action_btn} ${styles.not_buy_btn}`}>Не покупать</button>
            </div>
        </div>
    )
}

export default BuyGameFieldAction;