import styles from '../common.module.css';
import { useAppDispatch } from '../../../../../../hoocks/useAppDispatch';
import { AppDispatch } from '../../../../../../store';
import { rollTheDiceForMove } from '../../../../../../API/ws-thunks/games';

function Move() {
    const dispatch: AppDispatch = useAppDispatch()

    const handleRollDiceForMove = () => {
        dispatch(rollTheDiceForMove())
    }

    return (
        <div className={styles.container}>
            <div className={styles.text}>Сейчас ваш ход. Успейте бросить кости!</div>
            <button className={`${styles.btn} ${styles.btn_green}`} onClick={() => handleRollDiceForMove()}>Бросить кости</button>
        </div>
    )
}

export default Move;