import { makeMove } from '../../../../../API/ws-thunks/games';
import { useAppDispatch } from '../../../../../hoocks/useAppDispatch';
import styles from './make-move.module.css';
import general from '../general.module.css';
import { AppDispatch } from '../../../../../store';

function MakeMove() {
    const dispatch: AppDispatch = useAppDispatch()

    const handleMakeMove = () => {
        dispatch(makeMove())
    }

    return (
        <div className={general.container}>
            <div className={styles.text}>Успейте бросить кости, время ограниченно.</div>
            <button className={`${general.btn} ${styles.make_move_btn}`} onClick={() => handleMakeMove()}>Бросить кости</button>
        </div>
    )
}

export default MakeMove;