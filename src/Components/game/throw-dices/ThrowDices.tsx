import { useAppSelector } from '../../../hoocks/useAppSelector';
import { GamesStateT } from '../../../store/slices/games/types/games-state';
import Dice from './dice/Dice';
import styles from './throw-dices.module.css'
import { useState, useEffect, useRef } from 'react';

function ThrowDices() {
    const gameState: GamesStateT = useAppSelector(state => state.games)
    const [diceKey, setDiceKey] = useState(0)
    const [isShowDices, setIsShowDices] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        setIsShowDices(false)
        
        if (gameState.currentGame?.dices) {
            setIsShowDices(true)
            setDiceKey(prev => prev + 1)
            
            timeoutRef.current = setTimeout(() => {
                setIsShowDices(false)
                timeoutRef.current = null
            }, 2500)
        }
    }, [gameState.currentGame?.dices])

    if (!gameState.currentGame?.dices) return null

    return (
        <div className={`${styles.container} ${!isShowDices ? styles.hide_container : ''}`}>
            <Dice
                key={`dice1-${diceKey}`}
                throwDiceResult={gameState.currentGame.dices[0]}
            />
            <Dice
                key={`dice2-${diceKey}`}
                throwDiceResult={gameState.currentGame.dices[1]}
            />
        </div>
    )
}

export default ThrowDices;