import { useAppSelector } from '../../hoocks/useAppSelector';
import styles from './main-page.module.css'
import { PregameRoomsStateT, PregameRoomT } from '../../types/pregameRooms'
import PregameRoom from '../pregame-room/PregameRoom';
import MainHeader from '../headers/main-header/MainHeader';

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
                    <div className={styles.chat}>
                    <div className={styles.title}>Общий чат</div>
                    <ul className={styles.global_chat__messages_list}>
                        <li>Ку всем!!</li>
                        <li>Кто играть пойдёт?</li>
                        <li>ИДИ НАХУЙ!"!!!! </li>
                    </ul>
                    <div className={styles.global_chat__lower_section}>
                        <input className={styles.global_chat__input} placeholder='ввод сообщения...'/>
                        <button className={styles.global_chat__btn}>Отправить</button>
                    </div>
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