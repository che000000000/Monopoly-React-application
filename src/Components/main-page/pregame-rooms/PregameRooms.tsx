import { useEffect } from 'react';
import { useAppDispatch } from '../../../hoocks/useAppDispatch';
import { useAppSelector } from '../../../hoocks/useAppSelector';
import NoPregameRooms from '../no-items/NoItems';
import PregameRoom from './active-pregame-room/ActivePregameRoom';
import styles from './pregame-rooms.module.css'
import { connectPregameRoomsGateway } from '../../../API/ws-thunks/pregame-rooms';
import { PregameRoomT } from '../../../store/pregame-rooms/types/pregame-room';
import { PregameRoomsStateT } from '../../../store/pregame-rooms/types/pregame-rooms-state';

function PregameRooms() {
    const dispatch = useAppDispatch()
    const pregameRoomsState: PregameRoomsStateT = useAppSelector(state => state.pregameRooms)

    useEffect(() => {
        dispatch(connectPregameRoomsGateway())
    }, [])

    const activePregameRooms = pregameRoomsState.pregameRooms.pregameRoomsList.filter((room: PregameRoomT) => room.isCurrent !== true)
    
    return (
        <div className={styles.container}>
            <div className={styles.active_pregame_rooms_list}>
                {activePregameRooms
                    ? activePregameRooms.map(pregameRoom => {
                        if (pregameRoom.isCurrent === true) return null
                        else return <PregameRoom key={pregameRoom.id} pregameRoom={pregameRoom} authUser={pregameRoomsState.authUser}/>
                    })
                    : <NoPregameRooms text='В данный момент активных лобби нет' />
                }
            </div>
        </div>
    )
}

export default PregameRooms;