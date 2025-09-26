import { buyGameField } from '../../../../../API/ws-thunks/games';
import { useAppDispatch } from '../../../../../hoocks/useAppDispatch';
import styles from './buy-game-field.module.css';
import general from '../general.module.css';
import { AppDispatch } from '../../../../../store';

function BuyGameField() {
    const dispatch: AppDispatch = useAppDispatch()
    
    const handleBuyGameField = () => {
        dispatch(buyGameField())
    }
    
    return (
        <div className={general.container}>
            <div className={styles.text}>У вас есть возможность купить поле.</div>
            <div className={general.options}>
                <button className={`${general.btn} ${styles.buy_game_field_btn}`} onClick={() => handleBuyGameField()}>Купить</button>
                <button className={`${general.btn} ${styles.throw_buy_game_field_btn}`}>Не покупать</button>
            </div>
        </div>
    )
}

export default BuyGameField;