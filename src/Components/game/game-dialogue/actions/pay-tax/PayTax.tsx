import general from '../general.module.css';
import { GamesStateT } from '../../../../../store/slices/games/types/games-state';
import { useAppSelector } from '../../../../../hoocks/useAppSelector';
import { AppDispatch } from '../../../../../store';
import { useAppDispatch } from '../../../../../hoocks/useAppDispatch';
import { payTax } from '../../../../../API/ws-thunks/games';

function PayTax() {
    const gamesState: GamesStateT = useAppSelector(state => state.games)
    const dispatch: AppDispatch = useAppDispatch()

    const handlePayTax = () => {
        dispatch(payTax())
    }

    return (
        <div className={general.container}>
            {
                gamesState.currentGame?.turn.gamePayment
                && <div>{`Вы обязаны уплатить налог, в размере: М${gamesState.currentGame.turn.gamePayment.amount}`}</div>
            }
            <div className={general.options}>
                <button className={`${general.btn} ${general.btn_green}`} onClick={() => handlePayTax()}>Выплатить</button>
                <button className={`${general.btn} ${general.btn_red}`}>Сдаться</button>
            </div>
        </div>
    )
}

export default PayTax;