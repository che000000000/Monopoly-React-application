import { useEffect, useState, useMemo, useRef } from 'react';
import styles from '../common.module.css'
import { IGamePayment } from '../../../../../../store/interfaces/game-payment';
import { AppDispatch } from '../../../../../../store';
import { useAppDispatch } from '../../../../../../hoocks/useAppDispatch';
import { buyoutFromJail } from '../../../../../../API/ws-thunks/games';
import { GameTurnStage, IGameTurn } from '../../../../../../store/interfaces/game-turn';
import { IPlayer } from '../../../../../../store/interfaces/player';

export interface BuyoutFromJailProps {
    turn: IGameTurn,
    player: IPlayer | undefined,
    payment: IGamePayment | undefined
}

function BuyoutFromJail(props: BuyoutFromJailProps) {
    const dispatch: AppDispatch = useAppDispatch()
    const { turn, player, payment } = props
    const [isVisible, setIsVisible] = useState(false)
    
    const lastValidPayment = useRef<IGamePayment | null>(null)
    
    useEffect(() => {
        if (payment) {
            lastValidPayment.current = payment
        }
    }, [payment])

    const handleBuyoutFromJail = () => {
        dispatch(buyoutFromJail())
    }

    useEffect(() => {
        const shouldBeVisible = Boolean(
            player &&
            turn.stage === GameTurnStage.BUYOUT_FROM_JAIL &&
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
                    `Похоже вам не удалось выбраться из тюрьмы. Вам придётся заплатить M${paymentAmount}, чтобы вас освободили.`
                ) : (
                    'Не удалось загрузить текст окна выкупа из тюрьмы :('
                )}
            </div>
            <div className={styles.options}>
                <button
                    className={`${styles.btn} ${styles.btn_green}`}
                    onClick={handleBuyoutFromJail}
                    disabled={isDisabled || !isDataValid}
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

export default BuyoutFromJail;