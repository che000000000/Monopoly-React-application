import styles from '../common.module.css';
import { useEffect, useState, useMemo, useRef } from 'react';
import { buyoutFromJail, rollDiceToGetOutOfJail } from '../../../../../../../API/ws-thunks/games';
import { useAppDispatch } from '../../../../../../../hoocks/useAppDispatch';
import { AppDispatch } from '../../../../../../../store';
import { IGamePayment } from '../../../../../../../store/interfaces/game-payment';
import { GameTurnStage, IGameTurn } from '../../../../../../../store/interfaces/game-turn';
import { IPlayer } from '../../../../../../../store/interfaces/player';

export interface AtJailProps {
    turn: IGameTurn,
    player: IPlayer | undefined,
    payment: IGamePayment | undefined
}

function AtJail(props: AtJailProps) {
    const dispatch: AppDispatch = useAppDispatch()
    const { turn, player, payment } = props
    const [isVisible, setIsVisible] = useState(false)
    
    const lastValidPayment = useRef<IGamePayment | null>(null)
    
    useEffect(() => {
        if (payment) {
            lastValidPayment.current = payment
        }
    }, [payment])

    const handleRollDiceToGetOutOfJail = () => {
        dispatch(rollDiceToGetOutOfJail())
    }

    const handleBuyoutFromJail = () => {
        dispatch(buyoutFromJail())
    }

    useEffect(() => {
        const shouldBeVisible = Boolean(
            player &&
            turn.stage === GameTurnStage.AT_JAIL &&
            turn.player.id === player.id
        )
        setIsVisible(shouldBeVisible)
    }, [player, turn.stage, turn.player.id])

    const displayPayment = payment ?? lastValidPayment.current
    const isDataValid = Boolean(displayPayment)

    const paymentAmount = useMemo(() => displayPayment?.amount ?? '???', [displayPayment])
    const isDisabled = useMemo(() => 
        displayPayment ? displayPayment.amount > displayPayment.payerPlayer.balance : true,
        [displayPayment]
    )

    return (
        <div className={isVisible ? styles.container : `${styles.container} ${styles.container_hide}`}>
            <div className={styles.text}>
                {isDataValid ? (
                    `Вы оказались заключены в тюрьме. Бросьте кости, чтобы попытаться выбраться, или заплатите M${paymentAmount}, чтобы выйти прямо сейчас.`
                ) : (
                    'Не удалось загрузить текст для окна тюремного заключения :('
                )}
            </div>
            <div className={styles.options}>
                <button 
                    className={`${styles.btn} ${styles.btn_green}`} 
                    onClick={handleRollDiceToGetOutOfJail}
                >
                    Бросить кости
                </button>
                <button
                    className={`${styles.btn} ${styles.btn_red}`}
                    onClick={handleBuyoutFromJail}
                    disabled={isDisabled || !isDataValid}
                >
                    Заплатить
                </button>
            </div>
        </div>
    )
}

export default AtJail;