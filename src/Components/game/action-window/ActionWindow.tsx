import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hoocks/useAppSelector';
import { GameTurnStage } from '../../../store/enums/game-turn-stage';
import { AuthStateT } from '../../../store/slices/auth/types/auth-state';
import { GamesStateT } from '../../../store/slices/games/types/games-state';
import styles from './action-window.module.css'
import MakeMove from './make-move/MakeMove';
import BuyGameField from './buy-game-field/BuyGameField';

function ActionWindow() {
    const authState: AuthStateT = useAppSelector(state => state.auth)
    const gamesState: GamesStateT = useAppSelector(state => state.games)

    const [isShowWindow, setIsShowWindow] = useState(true)

    const handleSetIsShowWindow = (value: boolean) => {
        setIsShowWindow(value)
    }

    useEffect(() => {
        setIsShowWindow(true)
    }, [gamesState.currentGame?.turn.stage, setIsShowWindow])

    if (gamesState.currentGame?.turn.player.user.id !== authState.user?.id) return null

    switch (gamesState.currentGame?.turn.stage) {
        case (GameTurnStage.MOVE): return (
            <div className={`${styles.container} ${isShowWindow ? styles.show_container : ''}`}>
                <MakeMove setIsShowWindow={handleSetIsShowWindow} />
            </div>
        )
        case (GameTurnStage.BUY_GAME_FIELD): return (
            <div className={`${styles.container} ${isShowWindow ? styles.show_container : ''}`}>
                <BuyGameField setIsShowWindow={handleSetIsShowWindow} />
            </div>
        )
        default: {
            return null
        }
    }
}

export default ActionWindow;