import styles from './main-page.module.css'
import MainHeader from '../headers/main-header/MainHeader';
import GlobalChat from './global-chat/GlobalChat';
import ActiveFriends from './active-friends/ActiveFriends';
import NoAuthRedirect from '../../hoc/NoAuthRedirect';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hoocks/useAppDispatch';
import { connectPregameGateway } from '../../API/ws-thunks/pregame-rooms';
import PregameRooms from './pregame-rooms/PregameRooms';

function MainPage() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(connectPregameGateway())
    }, [])

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
                        <PregameRooms />
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

export default NoAuthRedirect(MainPage);