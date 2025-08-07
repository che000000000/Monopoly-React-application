import { useAppSelector } from '../../hoocks/useAppSelector';
import styles from './main-page.module.css'
import { PregameRoomsStateT, PregameRoomT } from '../../types/pregameRooms'
import PregameRoom from './pregame/pregame-room/PregameRoom';
import MainHeader from '../headers/main-header/MainHeader';
import GlobalChat from './global-chat/GlobalChat';

function MainPage() {
    const pregameRoomsState: PregameRoomsStateT = useAppSelector(state => state.pregame)

    return (
        <div className={styles.container}>
            <MainHeader />
            <div className={styles.content}>
                <div className={styles.content__side}>
                    <div className={styles.friends}>
                        <div className={styles.title}>Друзья</div>
                    </div>
                    <div className={styles.updates}>
                        <div className={styles.title}>Обновления</div>
                    </div>
                </div>
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
            </div>
        </div>
    )
}

export default MainPage;