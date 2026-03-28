import styles from '../common.module.css';
import { payThePayment } from '../../../../../../API/ws-thunks/games';
import { definePlayerChipIcon } from '../../../../../../common/define-player-chip';
import { useAppDispatch } from '../../../../../../hoocks/useAppDispatch';
import { AppDispatch } from '../../../../../../store';
import { IGamePayment } from '../../../../../../store/interfaces/game-payment';
import { GameTurnStage, IGameTurn } from '../../../../../../store/interfaces/game-turn';
import { IPlayer } from '../../../../../../store/interfaces/player';
import { useEffect, useState, useMemo, useRef } from 'react';

export interface GetPaymentFromPlayersProps {
    turn: IGameTurn,
    player: IPlayer | undefined,
    payment: IGamePayment | undefined
}

function GetPaymentFromPlayers(props: GetPaymentFromPlayersProps) {
    const dispatch: AppDispatch = useAppDispatch()
    const { turn, player, payment } = props
    const [isVisible, setIsVisible] = useState(false)

    const lastValidPayment = useRef<IGamePayment | null>(null)

    useEffect(() => {
        if (payment) {
            lastValidPayment.current = payment
        }
    }, [payment])

    const handlePayPlayer = () => {
        if (payment) {
            dispatch(payThePayment(payment.id))
        }
    }

    useEffect(() => {
        const shouldBeVisible = Boolean(
            player &&
            turn.stage === GameTurnStage.GET_PAYMENT_FROM_PLAYERS &&
            turn.player.id !== player.id &&
            payment
        )
        setIsVisible(shouldBeVisible)
    }, [player, turn.stage, turn.player.id, payment])

    const displayPayment = payment ?? lastValidPayment.current
    const isDataValid = Boolean(displayPayment)

    const paymentAmount = useMemo(() => displayPayment?.amount ?? 0, [displayPayment])
    const receiverName = useMemo(() => displayPayment?.receiverPaymentPlayer?.user.name ?? 'игрок', [displayPayment])
    const receiverChip = useMemo(() => displayPayment?.receiverPaymentPlayer?.chip, [displayPayment])
    const isDisabled = useMemo(() =>
        displayPayment ? displayPayment.amount > displayPayment.payerPlayer.balance : true,
        [displayPayment]
    )

    return (
        <div className={isVisible ? styles.container : `${styles.container} ${styles.container_hide}`}>
            <div className={styles.text}>
                {isDataValid ? (
                    <>
                        Вы должны заплатить M{paymentAmount}, игроку{' '}
                        <span className={styles.player_presentation}>
                            {receiverName}
                            {receiverChip && (
                                <img
                                    className={styles.player_chip}
                                    src={definePlayerChipIcon(receiverChip)}
                                    alt='player-chip'
                                />
                            )}
                        </span>.
                    </>
                ) : (
                    'Не удалось загрузить текст платежа от всех игроков :('
                )}
            </div>
            <div className={styles.options}>
                <button
                    className={`${styles.btn} ${styles.btn_green}`}
                    disabled={isDisabled || !isDataValid}
                    onClick={handlePayPlayer}
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

export default GetPaymentFromPlayers;