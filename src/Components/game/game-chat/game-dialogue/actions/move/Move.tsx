import styles from '../common.module.css';
import { useAppDispatch } from '../../../../../../hoocks/useAppDispatch';
import { AppDispatch } from '../../../../../../store';
import { rollTheDiceForMove } from '../../../../../../API/ws-thunks/games';
import { GameTurnStage, IGameTurn } from '../../../../../../store/interfaces/game-turn';
import { IPlayer } from '../../../../../../store/interfaces/player';
import { useEffect, useState } from 'react';

function Move(props: { turn: IGameTurn, player: IPlayer | undefined }) {
    const dispatch: AppDispatch = useAppDispatch()
    const { turn, player } = props
    const [isVisible, setIsVisible] = useState(false)

    const handleRollDiceForMove = () => {
        dispatch(rollTheDiceForMove())
    }

    useEffect(() => {
        const shouldBeVisible = Boolean(
            player &&
            turn.stage === GameTurnStage.WAITING_FOR_MOVE &&
            turn.player.id === player.id
        )
        setIsVisible(shouldBeVisible)
    }, [player, turn.stage, turn.player.id])

    return (
        <div className={isVisible ? styles.container : `${styles.container} ${styles.container_hide}`}>
            <div className={styles.text}>Сейчас ваш ход. Успейте бросить кости!</div>
            <button className={`${styles.btn} ${styles.btn_green}`} onClick={() => handleRollDiceForMove()}>
                Бросить кости
            </button>
        </div>
    )
}

export default Move;