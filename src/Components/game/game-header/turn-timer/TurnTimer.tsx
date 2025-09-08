import { useEffect, useState } from 'react';
import styles from './turn-timer.module.css'
import { useAppSelector } from '../../../../hoocks/useAppSelector';

function TurnTimer() {
    const gamesState = useAppSelector(state => state.games)
    const [timeLeft, setTimeLeft] = useState(0)

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`
    }

    useEffect(() => {
        if (!gamesState.currentGame || !gamesState.currentGame.turn) {
            setTimeLeft(0)
            return
        }

        const calculateTimeLeft = () => {
            const currentDate = new Date()
            const turnStartTime = new Date(gamesState.currentGame!.turn.updatedAt)
            const elapsedSeconds = Math.floor((currentDate.getTime() - turnStartTime.getTime()) / 1000)
            const remainingSeconds = gamesState.currentGame!.turn.expires - elapsedSeconds
            return Math.max(0, remainingSeconds)
        }

        setTimeLeft(calculateTimeLeft())

        const timerId = setInterval(() => {
            const remaining = calculateTimeLeft()
            setTimeLeft(remaining)
            
            if (remaining <= 0) {
                clearInterval(timerId)
            }
        }, 1000)

        return () => clearInterval(timerId)
    }, [gamesState.currentGame?.turn])

    return (
        <div className={styles.container}>
            <div className={styles.turn_timer__text}>
                ТАЙМЕР ХОДА
            </div>
            <div className={styles.timer}>
                {formatTime(timeLeft)}
            </div>
        </div>
    )
}

export default TurnTimer;