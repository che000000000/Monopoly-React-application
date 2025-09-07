import { makeMove } from '../../../../API/ws-thunks/games';
import { useAppDispatch } from '../../../../hoocks/useAppDispatch';
import styles from './make-move.module.css'

function MakeMove() {
    const dispatch = useAppDispatch()

    const handleMakeMove = () => {
        dispatch(makeMove())
    }

    return (
        <div className={styles.container}>
            <div className={styles.text}>Успейте бросить кости, время ограниченно.</div>
            <button className={styles.action_btn} onClick={() => handleMakeMove()}>Бросить кости</button>
        </div>
    )
}

export default MakeMove;