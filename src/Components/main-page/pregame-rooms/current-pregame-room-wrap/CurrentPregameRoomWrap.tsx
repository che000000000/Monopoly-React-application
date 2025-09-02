import { useAppSelector } from '../../../../hoocks/useAppSelector';
import { IPregameRoom } from '../../../../store/slices/pregame-rooms/interfaces/pregame-room';
import { PregameRoomsStateT } from '../../../../store/slices/pregame-rooms/types/pregame-rooms-state';
import CreatePregameRoom from './create-pregame-room/CreatePregameRoom';
import styles from './current-pregame-room-wrap.module.css'
import CurrentPregameRoom from './current-pregame-room/CurrentPregameRoom';

function CurrentPregameRoomWrap() {
    const pregameRoomsState: PregameRoomsStateT = useAppSelector(state => state.pregameRooms)

    const currentPregameRoom = pregameRoomsState.pregameRooms.pregameRoomsList.find((room: IPregameRoom) => room.isCurrent === true)

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