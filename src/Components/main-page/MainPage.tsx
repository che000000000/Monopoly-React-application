import styles from './main-page.module.css'
import MainHeader from '../headers/main-header/MainHeader';
import NoAuthRedirect from '../../hoc/NoAuthRedirect';
import PregameRooms from './pregame-rooms/PregameRooms';
import CurrentPregameRoomWrap from './pregame-rooms/current-pregame-room-wrap/CurrentPregameRoomWrap';
import GlobalChat from './global-chat/GlobalChat';
import Games from './games/Games';

function MainPage() {
    return (
        <div className={styles.container}>
            <MainHeader />
            <div className={styles.content}>
                <div className={styles.content__side}>
                    <div className={styles.pregame_rooms}>
                        <div className={styles.title}>Текущее лобби</div>
                        <CurrentPregameRoomWrap />
                    </div>
                    <div className={styles.pregame_rooms}>
                        <div className={styles.title}>Активные лобби</div>
                        <PregameRooms />
                    </div>
                </div>
                <div className={styles.content__side}>
                    <div className={styles.global_chat}>
                        <div className={styles.title}>Общий чат</div>
                        <GlobalChat />
                    </div>
                    <div className={styles.games}>
                        <div className={styles.title}>Игры</div>
                        <Games />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoAuthRedirect(MainPage);