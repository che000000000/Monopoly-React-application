import Header from './UI/header/Header';
import Game from './UI/game/Game';
import styles from './app.module.css'

function App() {
  return (
    <div className={styles.container}>
      {/* <Header /> */}
      <div className={styles.main_content}>
        <Game />
      </div>
    </div>
  )
}

export default App;