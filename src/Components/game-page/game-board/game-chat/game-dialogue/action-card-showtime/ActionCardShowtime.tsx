import styles from './action-card.module.css';
import { useEffect, useState, useMemo, useRef } from 'react';
import { ActionCardDeckType, IActionCard } from '../../../../../../store/interfaces/action-card';
import { GameTurnStage, IGameTurn } from '../../../../../../store/interfaces/game-turn';

export interface ActionCardShowtimeProps {
    turn: IGameTurn,
    actionCard: IActionCard | undefined
}

function ActionCardShowtime(props: ActionCardShowtimeProps) {
    const { turn, actionCard } = props
    const [isVisible, setIsVisible] = useState(false)
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const lastValidActionCard = useRef<IActionCard | null>(null)

    useEffect(() => {
        if (actionCard) {
            lastValidActionCard.current = actionCard
        }
    }, [actionCard])

    useEffect(() => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current)
            hideTimeoutRef.current = null
        }

        const shouldBeVisible = Boolean(
            turn.stage === GameTurnStage.ACTION_CARD_SHOWTIME &&
            actionCard
        )

        if (shouldBeVisible) {
            setIsVisible(true)
            
            if (turn.expires && typeof turn.expires === 'number') {
                const hideDelay = Math.max(0, turn.expires * 1000 - 200)
                hideTimeoutRef.current = setTimeout(() => {
                    setIsVisible(false)
                }, hideDelay)
            }
        } else {
            setIsVisible(false)
        }

        return () => {
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current)
                hideTimeoutRef.current = null
            }
        }
    }, [turn.stage, turn.expires, actionCard])

    const displayActionCard = actionCard ?? lastValidActionCard.current
    const isDataValid = Boolean(displayActionCard)

    const deckType = useMemo(() => displayActionCard?.deckType, [displayActionCard])
    const description = useMemo(() => displayActionCard?.description ?? 'Загрузка описания...', [displayActionCard])

    const title = useMemo(() => {
        if (!deckType) return 'ЗАГРУЗКА'
        return deckType === ActionCardDeckType.CHANCE ? 'ШАНС' : 'ОБЩЕСТВЕННАЯ КАЗНА'
    }, [deckType])

    const cardClassName = useMemo(() => {
        const baseClass = styles.container
        if (!deckType) return baseClass
        return deckType === ActionCardDeckType.CHANCE
            ? `${baseClass} ${styles.chance__background_color}`
            : `${baseClass} ${styles.community_chest__background_color}`
    }, [deckType])

    return (
        <div className={isVisible && isDataValid ? cardClassName : `${cardClassName} ${styles.container_hide}`}>
            <div className={styles.content}>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.description}>
                    <div className={styles.text}>
                        {description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActionCardShowtime;