import styles from '../common.module.css';
import { useEffect, useState, useMemo, useRef } from 'react';
import { payThePayment } from '../../../../../../../API/ws-thunks/games';
import { useAppDispatch } from '../../../../../../../hoocks/useAppDispatch';
import { AppDispatch } from '../../../../../../../store';
import { IGamePayment } from '../../../../../../../store/interfaces/game-payment';
import { GameTurnStage, IGameTurn } from '../../../../../../../store/interfaces/game-turn';
import { IPlayer } from '../../../../../../../store/interfaces/player';

export interface ToBankPaymentProps {
    turn: IGameTurn,
    player: IPlayer | undefined,
    payment: IGamePayment | undefined
}

function ToBankPayment(props: ToBankPaymentProps) {
    const dispatch: AppDispatch = useAppDispatch()
    const { turn, player, payment } = props
    const [isVisible, setIsVisible] = useState(false)
    
    const lastValidPayment = useRef<IGamePayment | null>(null)
    
    useEffect(() => {
        if (payment) {
            lastValidPayment.current = payment
        }
    }, [payment])

    const handlePayMoney = () => {
        if (payment) {
            dispatch(payThePayment(payment.id))
        }
    }

    useEffect(() => {
        const shouldBeVisible = Boolean(
            player &&
            turn.stage === GameTurnStage.TO_BANK_PAYMENT &&
            turn.player.id === player.id &&
            payment
        )
        setIsVisible(shouldBeVisible)
    }, [player, turn.stage, turn.player.id, payment])

    const displayPayment = payment ?? lastValidPayment.current
    const isDataValid = Boolean(displayPayment)

    const paymentAmount = useMemo(() => displayPayment?.amount ?? 0, [displayPayment])
    const isDisabled = useMemo(() => 
        displayPayment ? displayPayment.amount > displayPayment.payerPlayer.balance : true,
        [displayPayment]
    )

    return (
        <div className={isVisible ? styles.container : `${styles.container} ${styles.container_hide}`}>
            <div className={styles.text}>
                {isDataValid ? (
                    `Вам выставлен платеж. Заплатите M${paymentAmount}.`
                ) : (
                    'Не удалось загрузить текст платежа для банка :('
                )}
            </div>
            <div className={styles.options}>
                <button
                    className={`${styles.btn} ${styles.btn_green}`}
                    disabled={isDisabled || !isDataValid}
                    onClick={handlePayMoney}
                >
                    Заплатить
                </button>
                <button 
                    className={`${styles.btn} ${styles.btn_red}`}
                >
                    Сдаться
                </button>
            </div>
        </div>
    )
}

export default ToBankPayment;