import { useAppSelector } from '../../hoocks/useAppSelector';
import styles from './main-page.module.css'
import { PregameRoomsStateT } from '../../types/pregame-rooms'
import PregameRoom from './pregame/pregame-room/PregameRoom';
import MainHeader from '../headers/main-header/MainHeader';
import GlobalChat from './global-chat/GlobalChat';
import ActiveFriends from './active-friends/ActiveFriends';

function MainPage() {
    const pregameRoomsState: PregameRoomsStateT = useAppSelector(state => state.pregame)

    return (
        <div className={styles.container}>
            <MainHeader />
            <div className={styles.content}>
                <div className={styles.content__side}>
                    <div className={styles.global_chat}>
                        <div className={styles.title}>Общий чат</div>
                        <GlobalChat />
                    </div>
                    <div className={styles.pregame_rooms}>
                        <div className={styles.title}>Активные лобби</div>
                        <div className={styles.pregame_rooms__list}>
                            {pregameRoomsState.pregameRooms.map(pregameRoom =>
                                <PregameRoom key={pregameRoom.id} pregameRoom={pregameRoom} />
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.content__side}>
                    <div className={styles.friends}>
                        <div className={styles.title}>Сейчас в сети</div>
                        <ActiveFriends />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;