import styles from '../common.module.css';
import { IGamePayment } from '../../../../../../store/interfaces/game-payment';
import { IPlayer } from '../../../../../../store/interfaces/player';
import { definePlayerChipIcon } from '../../../../../../common/define-player-chip';
import { AppDispatch } from '../../../../../../store';
import { useAppDispatch } from '../../../../../../hoocks/useAppDispatch';
import { payThePayment } from '../../../../../../API/ws-thunks/games';
import { GameTurnStage, IGameTurn } from '../../../../../../store/interfaces/game-turn';
import { useEffect, useState, useMemo, useRef } from 'react';

export interface ToPlayersPaymentProps {
    turn: IGameTurn,
    player: IPlayer | undefined,
    payment: IGamePayment | undefined,
    receiversPlayers?: IPlayer[] // Сделаем необязательным
}

function ToPlayersPayment(props: ToPlayersPaymentProps) {
    const dispatch: AppDispatch = useAppDispatch()
    const { turn, player, payment, receiversPlayers = [] } = props // Значение по умолчанию []
    const [isVisible, setIsVisible] = useState(false)
    
    // Сохраняем предыдущие валидные данные для плавного скрытия
    const lastValidData = useRef<{ payment: IGamePayment; receiversPlayers: IPlayer[] } | null>(null)
    
    // Обновляем lastValidData, когда приходят валидные данные
    useEffect(() => {
        if (payment && receiversPlayers && receiversPlayers.length > 0) {
            lastValidData.current = { payment, receiversPlayers }
        }
    }, [payment, receiversPlayers])

    const handlePayPlayers = () => {
        if (payment) {
            dispatch(payThePayment(payment.id))
        }
    }

    useEffect(() => {
        const shouldBeVisible = Boolean(
            player &&
            turn.stage === GameTurnStage.TO_PLAYERS_PAYMENT &&
            turn.player.id === player.id &&
            payment &&
            receiversPlayers &&
            receiversPlayers.length > 0
        )
        setIsVisible(shouldBeVisible)
    }, [player, turn.stage, turn.player.id, payment, receiversPlayers])

    // Используем текущие данные или последние валидные для отображения
    const displayPayment = payment ?? lastValidData.current?.payment
    const displayReceivers = (receiversPlayers && receiversPlayers.length > 0) 
        ? receiversPlayers 
        : (lastValidData.current?.receiversPlayers ?? [])
    
    const isDataValid = Boolean(displayPayment && displayReceivers.length > 0)

    const paymentAmount = useMemo(() => displayPayment?.amount ?? 0, [displayPayment])
    const amountPerPlayer = useMemo(() => 
        displayReceivers.length > 0 ? paymentAmount / displayReceivers.length : 0,
        [paymentAmount, displayReceivers.length]
    )
    const isDisabled = useMemo(() => 
        displayPayment ? displayPayment.amount > displayPayment.payerPlayer.balance : true,
        [displayPayment]
    )

    // Если нет данных, не рендерим компонент
    if (!isDataValid && !isVisible) {
        return null
    }

    return (
        <div className={isVisible ? styles.container : `${styles.container} ${styles.container_hide}`}>
            <div className={styles.text}>
                {isDataValid ? (
                    <>
                        Вы должны заплатить каждому игроку по M{amountPerPlayer.toFixed(0)}. 
                        Игроки ожидающие платежа:{' '}
                        {displayReceivers.map((p, index) => (
                            <span key={p.id} className={styles.player_presentation}>
                                {p.user?.name ?? 'Неизвестный игрок'}
                                <img 
                                    className={styles.player_chip} 
                                    src={definePlayerChipIcon(p.chip)} 
                                    alt='player-chip' 
                                />
                                {index + 1 === displayReceivers.length ? '.' : ', '}
                            </span>
                        ))}
                    </>
                ) : (
                    'Не удалось загрузить текст платежа для игроков :('
                )}
            </div>
            <div className={styles.options}>
                <button
                    className={`${styles.btn} ${styles.btn_green}`}
                    disabled={isDisabled || !isDataValid}
                    onClick={handlePayPlayers}
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

export default ToPlayersPayment;