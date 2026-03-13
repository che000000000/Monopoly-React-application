import common from '../common.module.css';
import { makeMove } from '../../../../../API/ws-thunks/games';
import { useAppDispatch } from '../../../../../hoocks/useAppDispatch';
import { AppDispatch } from '../../../../../store';

function Move() {
    const dispatch: AppDispatch = useAppDispatch()

    const handleMakeMove = () => {
        dispatch(makeMove())
    }

    return (
        <div className={common.container}>
            <div className={common.text}>Сейчас ваш ход. Успейте бросить кости!</div>
            <button className={`${common.btn} ${common.btn_green}`} onClick={() => handleMakeMove()}>Бросить кости</button>
        </div>
    )
}

export default Move;