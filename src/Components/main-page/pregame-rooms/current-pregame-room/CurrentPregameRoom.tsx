import { leavePregameRoom } from '../../../../API/ws-thunks/pregame-rooms';
import { useAppDispatch } from '../../../../hoocks/useAppDispatch';
import { PregameRoomT } from '../../../../store/types/pregame-rooms';
import CreatePregameRoom from '../create-pregame-room/CreatePregameRoom';
import PregameRoomMember from '../pregame-room-member/PregameRoomMember';
import styles from './current-pregame-room.module.css'

function CurrentPregameRoom(props: { pregameRoom: PregameRoomT | null }) {
    const dispatch = useAppDispatch()

    const handleLeavePregameRoom = () => {
        dispatch(leavePregameRoom())
    }

    return (
        <div className={styles.container}>
            <div className={styles.options}>
                <div className={styles.options__select_chip}></div>
                <div className={styles.options__leave} onClick={() => handleLeavePregameRoom()}>Выйти</div>
            </div>
            <div className={styles.members_list}>
                {props.pregameRoom
                    ? props.pregameRoom.members.map(member => <PregameRoomMember {...member} />)
                    : <CreatePregameRoom />}
            </div>
        </div>
    )
}

export default CurrentPregameRoom;