import { Routes, Route } from 'react-router-dom'
import Game from './Components/game/Game';
import styles from './app.module.css'
import AuthForm, { AuthFormType } from './Components/auth-form/AuthForm';
import { useGetUserProfileMutation } from './API/rtk/authApi';
import { useCallback, useEffect } from 'react';
import MainPage from './Components/main-page/MainPage';
import { useAppDispatch } from './hoocks/useAppDispatch';
import { connectGamesGateway } from './API/ws-thunks/games';
import { connectPregameRoomsGateway } from './API/ws-thunks/pregame-rooms';
import { AuthStateT } from './store/types/auth';
import { useAppSelector } from './hoocks/useAppSelector';

function App() {
    const authState: AuthStateT = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const [getUserProfile] = useGetUserProfileMutation()

    const handleUserProfile = useCallback(async () => {
        await getUserProfile()
    }, [getUserProfile])

    useEffect(() => {
        handleUserProfile()
    }, [handleUserProfile])

    useEffect(() => {
        if (authState.isAuth) {
            dispatch(connectGamesGateway())
            dispatch(connectPregameRoomsGateway())
        }
    }, [authState.isAuth, dispatch])

    return (
        <div className={styles.container}>
            <Routes>
                <Route path='/login' element={<AuthForm type={AuthFormType.LOGIN} />} />
                <Route path='/register' element={<AuthForm type={AuthFormType.REGISTER} />} />
                <Route path='/main' element={<MainPage />} />
                <Route path='/game/:gameId?' element={<div className={styles.game_wrap}><Game /></div>} />
                <Route path='*' element={<MainPage />} />
            </Routes>
        </div>
    )
}

export default App;