import { useEffect, useState, useMemo, useRef } from 'react';
import { ActionCardDeckType, IActionCard } from '../../../../../store/interfaces/action-card';
import { GameTurnStage, IGameTurn } from '../../../../../store/interfaces/game-turn';
import styles from './action-card.module.css'

export interface ActionCardShowtimeProps {
    turn: IGameTurn,
    actionCard: IActionCard | undefined
}

function ActionCardShowtime(props: ActionCardShowtimeProps) {
    const { turn, actionCard } = props
    const [isVisible, setIsVisible] = useState(false)
    
    const lastValidActionCard = useRef<IActionCard | null>(null)
    
    useEffect(() => {
        if (actionCard) {
            lastValidActionCard.current = actionCard
        }
    }, [actionCard])

    useEffect(() => {
        const shouldBeVisible = Boolean(
            turn.stage === GameTurnStage.ACTION_CARD_SHOWTIME && 
            actionCard
        )
        setIsVisible(shouldBeVisible)
    }, [turn.stage, actionCard])

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