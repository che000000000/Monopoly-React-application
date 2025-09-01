import { useEffect } from 'react';
import { useAppSelector } from '../../../hoocks/useAppSelector';
import { GamesStateT } from '../../../store/games/types/games-state';
import NoItems from '../no-items/NoItems';
import styles from './games.module.css'
import { useNavigate } from 'react-router-dom';

function Games() {
    const gamesState: GamesStateT = useAppSelector(state => state.games)

    const navigate = useNavigate()

    useEffect(() => {
        if (gamesState.currentGame) {
            navigate(`/game/${gamesState.currentGame.id}`)
        }
    }, [gamesState.currentGame, navigate])

    return (
        <div className={styles.container}>
            <NoItems text='Сейчас никто не играет' />
        </div>
    )
}

export default Games;