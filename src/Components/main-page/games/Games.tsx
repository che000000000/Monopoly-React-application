import { useEffect } from 'react';
import { useAppSelector } from '../../../hoocks/useAppSelector';
import NoItems from '../no-items/NoItems';
import styles from './games.module.css'
import { useNavigate } from 'react-router-dom';
import { GamesStateT } from '../../../store/slices/games/types/games-state';
import { useAppDispatch } from '../../../hoocks/useAppDispatch';
import { getGamePreviewsPage } from '../../../API/ws-thunks/games';
import { IGamePreview } from '../../../store/slices/games/interfaces/game-preview';
import CurrentGame from './current-game/CurrentGame';
import ActiveGames from './active-games/ActiveGames';
import { clearGames } from '../../../store/slices/games/games-slice';
import { PlayerStatus } from '../../../store/enums/player-status';
import { AuthStateT } from '../../../store/slices/auth/types/auth-state';

function Games() {
    const authState: AuthStateT = useAppSelector(state => state.auth)
    const gamesState: GamesStateT = useAppSelector(state => state.games)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if (gamesState.isGatewayConnected) {
            dispatch(clearGames())
            dispatch(getGamePreviewsPage({}))
        }
    }, [gamesState.isGatewayConnected, dispatch])

    useEffect(() => {
        if (gamesState.startGameFlag) {
            navigate(`/game`)
        }
    }, [gamesState.startGameFlag, navigate])

    const currentGamePreview = gamesState.games.games.find(game =>
        game.id === gamesState.currentGame?.id &&
        game.players.some(player => 
            player.user.id === authState.user?.id && 
            player.status !== PlayerStatus.IS_LEFT
        )
    )
    
    const activeGamePrevies = gamesState.games.games.filter((game: IGamePreview) => (
        game.id !== currentGamePreview?.id)
    )

    return (
        <div className={gamesState.games.games.length !== 0 ? '' : styles.no_games_border}>
            {
                gamesState.games.games.length !== 0
                    ? (
                        <>
                            {currentGamePreview && <CurrentGame game={currentGamePreview} />}
                            {activeGamePrevies && <ActiveGames games={activeGamePrevies} />}
                        </>
                    )
                    : <NoItems text='Сейчас никто не играет' />
            }
        </div>
    )
}

export default Games;