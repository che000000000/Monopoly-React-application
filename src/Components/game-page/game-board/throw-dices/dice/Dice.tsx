import React, { useState, useEffect, useRef } from 'react';
import styles from './dice.module.css';

function Dice(props: { throwDiceResult: number }) {
    const [rolling, setRolling] = useState(false)
    const [displayValue, setDisplayValue] = useState(1)
    const prevResultRef = useRef(props.throwDiceResult)

    useEffect(() => {
        if (props.throwDiceResult !== prevResultRef.current) {
            prevResultRef.current = props.throwDiceResult
        }

        setRolling(true)

        const rollInterval = setInterval(() => {
            setDisplayValue(Math.floor(Math.random() * 6) + 1)
        }, 100)

        setTimeout(() => {
            clearInterval(rollInterval)
            setDisplayValue(props.throwDiceResult)
            setRolling(false)
        }, 1000)

    }, [props.throwDiceResult])

    const getDotPositions = (value: number): { cx: number; cy: number }[] => {
        const positions: { [key: number]: { cx: number; cy: number }[] } = {
            1: [{ cx: 50, cy: 50 }],
            2: [{ cx: 25, cy: 25 }, { cx: 75, cy: 75 }],
            3: [{ cx: 25, cy: 25 }, { cx: 50, cy: 50 }, { cx: 75, cy: 75 }],
            4: [{ cx: 25, cy: 25 }, { cx: 75, cy: 25 }, { cx: 25, cy: 75 }, { cx: 75, cy: 75 }],
            5: [
                { cx: 25, cy: 25 },
                { cx: 75, cy: 25 },
                { cx: 50, cy: 50 },
                { cx: 25, cy: 75 },
                { cx: 75, cy: 75 }
            ],
            6: [
                { cx: 25, cy: 20 },
                { cx: 75, cy: 20 },
                { cx: 25, cy: 50 },
                { cx: 75, cy: 50 },
                { cx: 25, cy: 80 },
                { cx: 75, cy: 80 }
            ]
        }
        return positions[value] || []
    }

    const dotPositions = getDotPositions(displayValue)

    return (
        <div className={styles.scene}>
            <div className={`${styles.dice} ${rolling ? styles.rolling : ''}`}>
                <div className={`${styles['dice-face']} ${styles['dice-front']}`}>
                    <svg viewBox="0 0 100 100">
                        {getDotPositions(1).map((position, index) => (
                            <circle key={index} cx={position.cx} cy={position.cy} r="8" className={styles.dot} />
                        ))}
                    </svg>
                </div>
                <div className={`${styles['dice-face']} ${styles['dice-back']}`}>
                    <svg viewBox="0 0 100 100">
                        {getDotPositions(6).map((position, index) => (
                            <circle key={index} cx={position.cx} cy={position.cy} r="8" className={styles.dot} />
                        ))}
                    </svg>
                </div>
                <div className={`${styles['dice-face']} ${styles['dice-right']}`}>
                    <svg viewBox="0 0 100 100">
                        {getDotPositions(3).map((position, index) => (
                            <circle key={index} cx={position.cx} cy={position.cy} r="8" className={styles.dot} />
                        ))}
                    </svg>
                </div>
                <div className={`${styles['dice-face']} ${styles['dice-left']}`}>
                    <svg viewBox="0 0 100 100">
                        {getDotPositions(4).map((position, index) => (
                            <circle key={index} cx={position.cx} cy={position.cy} r="8" className={styles.dot} />
                        ))}
                    </svg>
                </div>
                <div className={`${styles['dice-face']} ${styles['dice-top']}`}>
                    <svg viewBox="0 0 100 100">
                        {getDotPositions(2).map((position, index) => (
                            <circle key={index} cx={position.cx} cy={position.cy} r="8" className={styles.dot} />
                        ))}
                    </svg>
                </div>
                <div className={`${styles['dice-face']} ${styles['dice-bottom']}`}>
                    <svg viewBox="0 0 100 100">
                        {getDotPositions(5).map((position, index) => (
                            <circle key={index} cx={position.cx} cy={position.cy} r="8" className={styles.dot} />
                        ))}
                    </svg>
                </div>

                <div className={`${styles['dice-face']} ${styles['dice-current']}`}>
                    <svg viewBox="0 0 100 100" className={styles.diceSvg}>
                        {dotPositions.map((position, index) => (
                            <circle
                                key={index}
                                cx={position.cx}
                                cy={position.cy}
                                r="8"
                                className={styles.dot}
                            />
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Dice;