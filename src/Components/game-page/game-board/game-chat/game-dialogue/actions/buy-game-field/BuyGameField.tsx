import styles from '../common.module.css';
import { useEffect, useState, useMemo, useRef } from 'react';
import { buyGameField } from '../../../../../../../API/ws-thunks/games';
import { useAppDispatch } from '../../../../../../../hoocks/useAppDispatch';
import { AppDispatch } from '../../../../../../../store';
import { IGameField } from '../../../../../../../store/interfaces/game-field';
import { IGamePayment } from '../../../../../../../store/interfaces/game-payment';
import { GameTurnStage, IGameTurn } from '../../../../../../../store/interfaces/game-turn';
import { IPlayer } from '../../../../../../../store/interfaces/player';

export interface BuyGameFieldProps {
    turn: IGameTurn,
    player: IPlayer | undefined,
    field: IGameField | undefined,
    payment: IGamePayment | undefined
}

function BuyGameField(props: BuyGameFieldProps) {
    const dispatch: AppDispatch = useAppDispatch()
    const { turn, player, field, payment } = props
    const [isVisible, setIsVisible] = useState(false)

    const lastValidData = useRef<{ field: IGameField; payment: IGamePayment } | null>(null)

    useEffect(() => {
        if (field && payment) {
            lastValidData.current = { field, payment }
        }
    }, [field, payment])

    const handleBuyGameField = () => {
        dispatch(buyGameField())
    }

    useEffect(() => {
        const shouldBeVisible = Boolean(
            player &&
            turn.stage === GameTurnStage.BUY_GAME_FIELD &&
            turn.player.id === player.id
        )
        setIsVisible(shouldBeVisible)
    }, [player, turn.stage, turn.player.id, isVisible])

    const displayField = field ?? lastValidData.current?.field
    const displayPayment = payment ?? lastValidData.current?.payment
    const isDataValid = Boolean(displayField && displayPayment)

    const fieldName = useMemo(() => displayField?.name ?? '???', [displayField])
    const paymentAmount = useMemo(() => displayPayment?.amount ?? '???', [displayPayment])
    const isDisabled = useMemo(() =>
        displayPayment ? displayPayment.amount > displayPayment.payerPlayer.balance : true,
        [displayPayment]
    )

    return (
        <div className={isVisible ? styles.container : `${styles.container} ${styles.container_hide}`}>
            <div className={styles.text}>
                {isDataValid ? (
                    `У вас есть возможность приобрести собственность "${fieldName}". Заплатите M${paymentAmount} или эта собственность будет выставлена на аукцион.`
                ) : (
                    `Не удалось загрузить текст для окна приобретения собственности :(`
                )}
            </div>
            <div className={styles.options}>
                <button
                    className={`${styles.btn} ${styles.btn_green}`}
                    onClick={handleBuyGameField}
                    disabled={isDisabled || !isDataValid}
                >
                    Выкупить
                </button>
                <button
                    className={`${styles.btn} ${styles.btn_red}`}
                >
                    На аукцион
                </button>
            </div>
        </div>
    )
}

export default BuyGameField;