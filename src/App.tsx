import { Routes, Route } from 'react-router-dom'
import Game from './Components/game/Game';
import styles from './app.module.css'
import AuthForm, { AuthFormType } from './Components/auth-form/AuthForm';
import MainPage from './Components/main-page/MainPage';

function App() {
    return (
        <div className={styles.container}>
            <Routes>
                <Route path='/login' element={<AuthForm type={AuthFormType.LOGIN} />} />
                <Route path='/register' element={<AuthForm type={AuthFormType.REGISTER} />} />
                <Route path='/game' element={<div className={styles.game_wrap}><Game /></div>} />
                <Route path='/main' element={<MainPage />} />
                <Route path='*' element={<MainPage />} />
            </Routes>
        </div>
    )
}

export default App;