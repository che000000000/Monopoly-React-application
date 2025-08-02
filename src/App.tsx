import { Routes, Route } from 'react-router-dom'
import Game from './UI/game/Game';
import styles from './app.module.css'
import AuthForm, { AuthFormTypes } from './UI/auth/auth-form/AuthForm';

function App() {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path='/login' element={<AuthForm type={AuthFormTypes.LOGIN} />} />
        <Route path='/register' element={<AuthForm type={AuthFormTypes.REGISTER}/>} />
        <Route path='/game' element={<Game />} />
        <Route path='*' element={<div>Not found</div>} />
      </Routes>
    </div>
  )
}

export default App;