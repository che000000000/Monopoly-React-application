import { useAppSelector } from '../../../../hoocks/useAppSelector';
import { PregameRoomT } from '../../../../store/pregame-rooms/types/pregame-room';
import { PregameRoomsStateT } from '../../../../store/pregame-rooms/types/pregame-rooms-state';
import CreatePregameRoom from './create-pregame-room/CreatePregameRoom';
import styles from './current-pregame-room-wrap.module.css'
import CurrentPregameRoom from './current-pregame-room/CurrentPregameRoom';

function CurrentPregameRoomWrap() {
    const pregameRoomsState: PregameRoomsStateT = useAppSelector(state => state.pregameRooms)

    const currentPregameRoom = pregameRoomsState.pregameRooms.pregameRoomsList.find((room: PregameRoomT) => room.isCurrent === true)

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