import { useAppSelector } from '../../../../hoocks/useAppSelector';
import { PregameRoomsStateT, PregameRoomT } from '../../../../store/types/pregame-rooms';
import CreatePregameRoom from './create-pregame-room/CreatePregameRoom';
import styles from './current-pregame-room-wrap.module.css'
import CurrentPregameRoom from './current-pregame-room/CurrentPregameRoom';

function CurrentPregameRoomWrap() {
    const pregameRoomsState: PregameRoomsStateT = useAppSelector(state => state.pregameRooms)

    const currentPregameRoom = pregameRoomsState.pregameRooms.find((room: PregameRoomT) => room.isCurrent === true)

    return (
        <div className={styles.container}>
            {currentPregameRoom && pregameRoomsState.authUser
                ? <CurrentPregameRoom
                    pregameRoom={currentPregameRoom}
                    messages={pregameRoomsState.currentPregameRoomChat.messages}
                    authUser={pregameRoomsState.authUser}
                />
                : <CreatePregameRoom />
            }
        </div>
    )
}

export default CurrentPregameRoomWrap;