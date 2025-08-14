import { useAppSelector } from '../../../hoocks/useAppSelector';
import { PregameRoomsStateT } from '../../../store/types/pregame-rooms';
import NoPregameRooms from '../no-items/NoItems';
import PregameRoom from './pregame-room/PregameRoom';
import styles from './pregame-rooms.module.css'

function PregameRooms() {
    const pregameRoomsState: PregameRoomsStateT = useAppSelector(state => state.pregameRooms)

    return (
        <div className={styles.container}>
            {pregameRoomsState.pregameRooms.length !== 0
                ? pregameRoomsState.pregameRooms.map(pregameRoom =>
                    <PregameRoom key={pregameRoom.id} pregameRoom={pregameRoom} />
                )
                : <NoPregameRooms text={'Активных лобби ещё нет. Но вы можете создать его сами.'} />
            }
        </div>
    )
}

export default PregameRooms;