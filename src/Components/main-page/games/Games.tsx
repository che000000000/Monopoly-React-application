import { useEffect } from 'react';
import { useAppSelector } from '../../../hoocks/useAppSelector';
import NoItems from '../no-items/NoItems';
import styles from './games.module.css'
import { useNavigate } from 'react-router-dom';
import { GamesStateT } from '../../../store/slices/games/types/games-state';

function Games() {
    const gamesState: GamesStateT = useAppSelector(state => state.games)

    const navigate = useNavigate()

    useEffect(() => {
        if (gamesState.currentGame) {
            navigate(`/game`)
        }
    }, [gamesState.currentGame, navigate])

    return (
        <div className={styles.container}>
            <NoItems text='Сейчас никто не играет' />
        </div>
    )
}

export default Games;