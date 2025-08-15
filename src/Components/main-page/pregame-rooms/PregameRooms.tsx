import { useEffect } from 'react';
import { useAppDispatch } from '../../../hoocks/useAppDispatch';
import { useAppSelector } from '../../../hoocks/useAppSelector';
import { PregameRoomsStateT, PregameRoomT } from '../../../store/types/pregame-rooms';
import NoPregameRooms from '../no-items/NoItems';
import PregameRoom from './active-pregame-room/ActivePregameRoom';
import styles from './pregame-rooms.module.css'
import { connectPregameRoomsGateway } from '../../../API/ws-thunks/pregame-rooms';
import CurrentPregameRoom from './current-pregame-room/CurrentPregameRoom';
import CreatePregameRoom from './create-pregame-room/CreatePregameRoom';

function PregameRooms() {
    const dispatch = useAppDispatch()
    const pregameRoomsState: PregameRoomsStateT = useAppSelector(state => state.pregameRooms)

    useEffect(() => {
        dispatch(connectPregameRoomsGateway())
    }, [])

    const currentPregameRoom = pregameRoomsState.pregameRooms.find((room: PregameRoomT) => room.isCurrent === true)
    const activePregameRooms = pregameRoomsState.pregameRooms.filter((room: PregameRoomT) => room.isCurrent !== true)
    
    return (
        <div className={styles.container}>
            <div className={styles.current_pregame_room}>
                {currentPregameRoom
                    ? <CurrentPregameRoom pregameRoom={currentPregameRoom} />
                    : <CreatePregameRoom />
                }
            </div>
            <div className={styles.active_pregame_rooms_list}>
                {activePregameRooms.length !== 0
                    ? activePregameRooms.map(pregameRoom => {
                        if (pregameRoom.isCurrent === true) return null
                        else return <PregameRoom key={pregameRoom.id} pregameRoom={pregameRoom} />
                    })
                    : <NoPregameRooms text='В данный момент активных лобби нет' />
                }
            </div>
        </div>
    )
}

export default PregameRooms;