import styles from '../../common.module.css'
import { IGamePayment } from '../../../../../../../store/interfaces/game-payment';
import { IPlayer } from '../../../../../../../store/interfaces/player';
import { definePlayerChipIcon } from '../../../../../../../common/define-player-chip';
import { AppDispatch } from '../../../../../../../store';
import { useAppDispatch } from '../../../../../../../hoocks/useAppDispatch';
import { payThePayment } from '../../../../../../../API/ws-thunks/games';

function PayPlayers(props: { payment: IGamePayment, receiversPlayers: IPlayer[] }) {
    const dispatch: AppDispatch = useAppDispatch()
    const { payment, receiversPlayers } = props

    const handlePayPlayers = (paymentId: string) => {
        dispatch(payThePayment(paymentId))
    }

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Вы должны заплатить каждому игроку по: M{payment.amount / receiversPlayers.length}. Игроки ожидающие платежа: {' '}
                {receiversPlayers.map((p, index) => (
                    <span key={index} className={styles.player_presentation}>
                        {p.user.name}
                        <img className={styles.player_chip} src={definePlayerChipIcon(p.chip)} alt='player-chip' key={p.id}/>
                        {index + 1 === receiversPlayers.length ? '.' : `, `}
                    </span>
                ))}
            </div>
            <div className={styles.options}>
                <button
                    className={`${styles.btn} ${styles.btn_green}`}
                    disabled={payment.amount > payment.payerPlayer.balance}
                    onClick={() => handlePayPlayers(payment.id)}
                >
                    Заплатить
                </button>
                <button className={`${styles.btn} ${styles.btn_red}`}>Сдаться</button>
            </div>
        </div>
    )
}

export default PayPlayers;